import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

@Component({
  selector: 'app-hi',
  templateUrl: './hi.component.html',
  styleUrls: ['./hi.component.css']
})
export class HiComponent implements OnInit {

  private d3: D3; // <-- Define the private member which will hold the d3 reference
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>
  private d3G: Selection<SVGGElement, any, null, undefined>


  constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3; // <-- for convenience use a block scope variable
    let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)
    let d3G: Selection<SVGGElement, any, null, undefined>;




// ...

    if (this.parentNativeElement !== null) {

      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method 
      this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');
      this.d3Svg.attr('width',400);
      this.d3Svg.attr('height',400);

      d3G = this.d3G = this.d3Svg.append<SVGGElement>('g');
      // Do more D3 things
      let dataArray : any;
      dataArray = [{x:5,y:5},{x:10,y:15},{x:20,y:7},{x:30,y:18},{x:40,y:10}];
/*      let dataArray : [number,number][];
      dataArray = [[5,5],[10,15],[20,7],[30,18],[40,10]];
*/
			var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

			var line = d3.line<DataType>()
			                .x(function(d,i){ return d.x*6; })
			                .y(function(d,i){ return d.y*4; })
			                .curve(d3.curveCardinal);

			var chartGroup = svg.append("g").attr("transform","translate(0,0)")

			d3G.append("path")
			      .attr("fill","none")
			      .attr("stroke","blue")
			      .attr("d",line(dataArray));

			d3G.selectAll("circle")
				.data<DataType>(dataArray)
				.enter().append("circle")
				.attr("cx",function(d,i){ console.log("d",d);return d.x*6; })
				.attr("cy",function(d,i){ return d.y*4; })
				.attr("r",2) 
		}
  }

}

export type DataType= {x:any,y:any};
