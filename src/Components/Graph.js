import React, { Component } from 'react';
import config from '../config.js';
const firebase = require('firebase')
var d3 = require('d3');

let data = {
  nodes: [],
  links: [],
}

let connectedActors = [];
let actorIndex = [];

export class Graph extends Component {
  constructor(props) {
    super();
    this.state = {
      movieInfo: {},
    }
  }

  drag = (simulation, tooltip, headerHeight, navHeight) => {
    function dragStarted(d) {
      if(!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      tooltip.style('top', (d.fy + headerHeight + navHeight - 20) + 'px').style('left',(d.fx + 20) + 'px');
    }

    function dragEnded(d) {
      if(!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded);
  }

  chart(nodes, links) {
    const width = 1920
    const height = 800

    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));

    const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(obj_links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const simulation = d3.forceSimulation(obj_nodes)
      .force('link', d3.forceLink().links(obj_links).id(d => { return d.name; }).distance(200))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width/2, height/2));

    let tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')

     const hf = (node) => {
      if(node.type === 'movie') {
        return node.src;
      }
     
      return '';
     }

    svg.append('defs')
      .selectAll('pattern')
      .data(obj_nodes)
      .enter()
      .append("pattern")
      .attr('id', function(d) {
        return 'id-'+d.id;
      })
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', 1)
      .attr('height', 1)
      .append('image')
      .attr('xlink:href', hf)
      .attr('x', -35)
      .attr('y', -35)
      .attr('width', 220)
      .attr('height', 220);
     
    const color = (node) =>{
          if(node.type === 'movie') {
               return ("url(#id-"+node.id+")");
          }
          return d3.color('gray');
    }

    const radius = (node) => {
     if(node.type === 'actor') {
       return 30;
     } 
     return 75;
   }
      
    const node = svg.append('g')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 1.5)
      .selectAll('circle')
      .data(obj_nodes)
      .join('circle')
      .attr('r', radius)
      .style('fill', color)
      .attr('cursor', 'pointer')

     const headerHeight = document.getElementsByClassName('header')[0].offsetHeight;
     const navHeight = document.getElementsByClassName('nav-bar')[0].offsetHeight;
     node.on('mouseover', function(node){
        if(node.type === 'actor') {
          tooltip.text(node.name);
          tooltip.style('visibility', 'visible');
          tooltip.style('top', (d3.event.y-30)+'px').style('left',(d3.event.x+15)+'px');
        }
      })
	    .on('mouseout', function(){
        return tooltip.style('visibility', 'hidden');
      })
      .call(this.drag(simulation, tooltip, headerHeight, navHeight));

    simulation.on('tick', () => {
      link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

      node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
    });

    return svg.node();
  }

  componentDidMount(){
    document.title = 'Graph';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let movsInGraph = [];
    let ref = firebase.database().ref('relations');
    ref.once('value').then(snapshot => {
      let rels = snapshot.val();
      for (let entry in rels) {
        if(rels[entry].list === 'GraphViz') {
          movsInGraph.push(rels[entry].mov);
        }
      }
    });

    let movieInfo = [];
    let movsRef = firebase.database().ref('movies');
    movsRef.once('value').then(snapshot => {
      let movies = snapshot.val();
      for (let entry in movies) {
        if (movsInGraph.includes(entry)) {
          movieInfo.push({
            name:  movies[entry].name,
            src:  movies[entry].src,
            actors: movies[entry].actors,
            id:  entry,
          })
          console.log("already push actors: ", movies[entry].actors);
        }
      }

     let index = 0;
     for(let i in movieInfo) {
        let movieObj = {
          type: 'movie',
          name: movieInfo[i].name,
          src: movieInfo[i].src,
          id: index,
        }
        index++;
        data.nodes.push(movieObj);
     
     //    console.log("movie actors are :", movieInfo[i].actors);
        let actors = movieInfo[i].actors.split(', ');
        for(let j in actors) {
          let actObj = {
            type: 'actor',
            name: actors[j],
            id: index,
          }
          index++;

          if(!(connectedActors.includes(actors[j]))) {
            connectedActors.push(actors[j]);
            data.nodes.push(actObj);
            let loc = data.nodes.indexOf(actObj);
            actorIndex.push(loc);
          }
          
          let linkObj = {
            source: movieInfo[i].name,
            target: actors[j],
            live: 1,
          }
          data.links.push(linkObj);
        }
      }

      const elem = document.getElementById('mysvg');
      elem.appendChild(this.chart(data.nodes, data.links));
    });
  }

  componentWillUnmount() {
    data.nodes = [];
    data.links = [];
    connectedActors = [];
    actorIndex = [];
  }

  render() {
    return <div id='mysvg'>
      </div>      
  }
}
export default Graph;