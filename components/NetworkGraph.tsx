import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Incident } from '../types';

interface NetworkGraphProps {
  data: Incident[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current || !wrapperRef.current) return;

    // Process data into nodes and links
    // Linking Processes -> Types
    const nodesMap = new Map<string, { id: string, group: number, val: number }>();
    const linksMap = new Map<string, { source: string, target: string, value: number }>();

    data.forEach(d => {
      // Process Node
      if (!nodesMap.has(d.process)) nodesMap.set(d.process, { id: d.process, group: 1, val: 1 });
      else nodesMap.get(d.process)!.val++;

      // Type Node
      if (!nodesMap.has(d.type)) nodesMap.set(d.type, { id: d.type, group: 2, val: 1 });
      else nodesMap.get(d.type)!.val++;

      // Link
      const linkId = `${d.process}-${d.type}`;
      if (!linksMap.has(linkId)) linksMap.set(linkId, { source: d.process, target: d.type, value: 1 });
      else linksMap.get(linkId)!.value++;
    });

    const nodes = Array.from(nodesMap.values());
    const links = Array.from(linksMap.values()).map(l => ({ ...l }));

    // Dimensions
    const width = wrapperRef.current.clientWidth || 600;
    const height = 300;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(30));

    const link = svg.append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => 5 + Math.sqrt(d.val) * 2)
      .attr("fill", d => d.group === 1 ? "#3b82f6" : "#ef4444")
      .call(drag(simulation) as any);

    node.append("title")
      .text(d => d.id);

    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", "10px")
      .attr("fill", "#475569")
      .attr("dx", 12)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
        
      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, [data]);

  return (
    <div ref={wrapperRef} className="w-full h-full flex flex-col">
      <h3 className="text-sm font-semibold text-slate-700 mb-2 px-4 pt-2">Rede: Processos vs Tipos</h3>
      <svg ref={svgRef} className="w-full h-full" style={{ maxHeight: '300px' }}></svg>
    </div>
  );
};

export default NetworkGraph;
