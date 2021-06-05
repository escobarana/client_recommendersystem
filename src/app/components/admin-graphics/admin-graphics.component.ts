import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';
import c3 from 'c3';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-admin-graphics',
  templateUrl: './admin-graphics.component.html',
  styleUrls: ['./admin-graphics.component.css', './libs/c3.css']
})
export class AdminGraphicsComponent implements OnInit {

totalAcceptedIOS: number;
totalDeclinedIOS: number;
totalAcceptedAndroid: number;
totalDeclinedAndroid: number;

reviewers = [];
reviewersEmails = []
chart;
json = [];

isLoaded: boolean = false;

delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private userService: UserService, private database: DatabaseService) { 
    
    this.userService.getAllUsers().subscribe(user => {
      if(user.role==="reviewer"){
        this.reviewers.push(user)
      }
    });    
  }

  ngOnInit(): void {

    this.database.getCountFinalAcceptIOS().subscribe(count =>{
      this.totalAcceptedIOS = count[0]['count'];
    })

    this.database.getCountFinalRemoveIOS().subscribe( x => {
      this.totalDeclinedIOS = x[0]['count'];
    });

    this.database.getCountFinalAcceptAndroid().subscribe(count =>{
      this.totalAcceptedAndroid = count[0]['count'];
    })

    this.database.getCountFinalRemoveAndroid().subscribe( x => {
      this.totalDeclinedAndroid = x[0]['count'];      
    });
    


    this.userService.getAllUsers().subscribe(users => {
        users.forEach(user => {
          // console.log(user)
          if(user.role === "reviewer"){
            this.userService.getReviewedCount(user.email).subscribe(data => {
              // console.log(data[0].recommend_count)
              this.reviewersEmails.push(user.email)
              this.json.push(data[0])
              this.bitDelay()
            })
          }
        });
      // console.log(this.json) 
    });

    this.waitSeconds();
    
  }

  async waitSeconds(){
    await this.delay(1500)
    this.isLoaded = true;
    await this.delay(5)
    // Plot charts once the data is retreieved from ddbb and the variables filled
    this.addChartApps()
    this.addChartReviewers()
    
  }

  async bitDelay(){
    await this.delay(500)
  }

  addChartReviewers(){
    this.chart = c3.generate({
      bindto: "#chart_rev",
      data: {
        json: this.json,
        keys: {
          value:['recommend_count','remove_count']
        },
        type: "bar",
       groups: [
          ["recommend_count", "remove_count"],
        ],
        names: {
          recommend_count: 'Proposed to accept',
          remove_count: 'Proposed to remove'
        }
      },
      tooltip:{
        format: {
          title: function(x) {
            return 'State of mobile applications reviewed';
          }
        }
      },
      axis: {
        y: {
          label: 'Quantity of reviewed apps'
        },
        x: {
          type: 'category',
          categories: this.reviewersEmails
        },
      }
    });
  }

  addChartApps(){
    this.chart = c3.generate({
      bindto: "#chart_apps",
      data: {
        columns: [
          ['Final accepted IOS', Number(this.totalAcceptedIOS)],
          ['Final declined IOS', Number(this.totalDeclinedIOS)],
          ['Final accepted Android', Number(this.totalAcceptedAndroid)],
          ['Final declined Android', Number(this.totalDeclinedAndroid)],
        ],
        type: "donut",
        groups: [
          ["Final accepted IOS", "Final declined IOS", "Final accepted Android", "Final declined Android"],
        ],
      },
      tooltip:{
        format: {
          title: function(x) {
            return 'Final mobile applications';
          }
        }
      },
      axis: {
        y: {
          label: 'Quantity of apps'
        },
        x: {
          show: false
        }
      },
      donut: {
        title: "Final apps"
      }
    });
  }
}
