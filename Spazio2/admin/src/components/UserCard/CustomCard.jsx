/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";

const defHeight = 200;
const defWidth = 160;

export class CustomCard extends Component {
  render() {
    return (
      <div
        className="card card-user"
        style={{
          borderRadius: "10px",
          position: "relative",
          maxHeight: defHeight,
          minHeight: defHeight,
          width: defWidth,
          overflow: "hidden",
          boxShadow: '3px 3px 5px gray',
          borderColor: this.props.time < 5 ?'black':this.props.gender == "boy" ? "#AAAAFF" : "#FFAAAA",
          borderStyle: 'solid',
          borderWidth: 'thick'

        }}
      >
        <img
          src={this.props.bgImage}
          alt="..."
          style={{
            height: defHeight,
            width: "auto",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)"
          }}
        />
        <div
          className="content"
          style={{
            padding: 0,
            height: defHeight,
            width: defWidth,
            position: "absolute"
          }}
        >
          <div
            className="text-center"
            style={{
              padding: 5,
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: this.props.time < 5 ?'black':this.props.gender == "boy" ? "#AAAAFF" : "#FFAAAA"
            }}
          >
            <h5 className="title"
            style={{
              color: this.props.time < 5 ?'white':'black'
            }}
            >
              {this.props.bracelet && <strong>[{this.props.bracelet}] </strong>}
              {this.props.name}
            </h5>
            {this.props.time && (
              <span
                style={{
                  minWidth: 25,
                  borderRadius: "50%",
                  padding: "3px 3px 0 3px",
                  backgroundColor: this.props.time < 5 ?this.props.gender == "boy" ? "#AAAAFF" : "#FFAAAA":'white'
                }}
              >
                {this.props.time}
              </span>
            )}
          </div>
        </div>
        <div
          className="btn-group-sm"
          style={{
            padding: "5px",
            width: defWidth,
            position: "absolute",
            bottom: "0",
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center"
          }}
        >
          <Button
            fill as="input" type="button"
            bsStyle="success"
            href={`tel:${this.props.phone1}`}
            style={{ borderRadius: "50%" }}
          >
            <i className="fa fa-2x fa-phone" />
          </Button>
          {this.props.phone2 && (
            <Button
              fill
              bsStyle="success" 
              href={`tel:${this.props.phone2}`}
              style={{ borderRadius: "50%" }}
            >
              <i className="fa fa-2x fa-phone" />
            </Button>
          )}
          <Button 
            fill 
            bsStyle="danger" 
            href="+5528999090476"
            style={{ borderRadius: "50%" }}
          >
            <i className="fa fa-2x fa-sign-out" />
          </Button>
        </div>
      </div>
    );
  }
}

export default CustomCard;
