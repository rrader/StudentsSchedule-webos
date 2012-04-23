enyo.kind({
  name: "RRader.Schedule",
  kind: enyo.VFlexBox,
  components: [
    {kind: "ApplicationEvents", onLoad: "onLoad"},
    {kind: "Popup", name:"editPopup", components: [
        {name:"editDayLabel"},
        {kind: "VirtualRepeater", name: "editSubjectsList", onSetupRow: "getEditListItem",
	          components: [
	              {kind: "Item", layoutKind: "VFlexLayout", onclick:"editItemClick", components: [
	                  {name: "editTitle", kind: "Divider"},
	                  {name: "editDescription"}
	              ]}
	          ]},
	    {kind: "Button", caption:"Add", onclick:"editAddClick"}
    ]},
    
    {kind: "Popup", name:"editItemPopup", components: [
    	{kind: "RowGroup", caption: "Предмет", components: [
    		{kind: "Input", name:"editSubject", hint: "Предмет", onchange: "editSubjectChange"}
    	]},
    	{kind: "RowGroup", caption: "Преподователь", components: [
    		{kind: "Input", name:"editLecturer", hint: "Преподователь", onchange: "editLecturerChange"}
    	]},
    	{kind: "RowGroup", caption: "Аудитория", components: [
    		{kind: "Input", name:"editAudience", hint: "Аудитория", onchange: "editAudienceChange"}
    	]},
    ]},
  
  	{kind: "PageHeader", content: "Students Schedule"},
  	
  	{kind: "Control", flex:1, layoutKind: "HFlexLayout", components: [
	  	{kind: "Control", flex: 3, components: [
	  		  {layoutKind: "HFlexLayout", pack:"center", align: "center", components: [
	          	  {content: "Monday", name:"dayLabel"},
	          	  {kind:"Button", caption: "edit", onclick:"editClicked"}
	          ]},
	          {kind: "VirtualRepeater", name: "subjectsList", onSetupRow: "getListItem",
	          components: [
	              {kind: "Item", layoutKind: "VFlexLayout", components: [
	                  {name: "title", kind: "Divider"},
	                  {name: "description"}
	              ]}
	          ]}
	      ]
	    },
	    {kind: "Control", flex:1, layoutKind: "VFlexLayout", components: [
	        {kind:"RowGroup", caption: "Выбор дня", components: [
			    {kind: "RadioToolButtonGroup", name:"weekIndex", components: [
			        {content:"1 неделя", onclick: "weekChanged"},
			        {content:"2 неделя", onclick: "weekChanged"},
	            ]},
	            {kind: "Group", name:"weekDays", layoutKind: "VFlexLayout", components: [
	                {kind: "Button", caption: "Понедельник", onclick: "dayChanged", depressed:true, toggling: true},
	                {kind: "Button", caption: "Вторник", onclick: "dayChanged", toggling: true},
	                {kind: "Button", caption: "Среда", onclick: "dayChanged", toggling: true},
	                {kind: "Button", caption: "Четверг", onclick: "dayChanged", toggling: true},
	                {kind: "Button", caption: "Пятница", onclick: "dayChanged", toggling: true},
	                {kind: "Button", caption: "Суббота", onclick: "dayChanged", toggling: true},
	                {kind: "Button", caption: "Воскресенье", onclick: "dayChanged", toggling: true}
	            ]}
	        ]}
		]}
	]}
  ],
  
  reloadData: function() {
  	  var selectedWeek = this.$.weekIndex.getValue();
  	  
  	  var container = this.$.weekDays.children.filter(function filter(x) { return (x.name=="client") } );
      var days = container[0].children;
      var selectedDay = 0;
      var selectedDayLabel = "";
      for(var i=0;i<days.length;i++) {
          if (days[i].getDepressed()) {
              selectedDay = i;
              selectedDayLabel = days[i].getCaption();
              break;
          }
      }
      selectedDay += selectedWeek*7;
      
      this.$.dayLabel.setContent(selectedDayLabel);
      this.currentDayLabel = selectedDayLabel;
      this.currentDay = selectedDay;
      this.$.subjectsList.render();
      //localStorage
  },
  
  dayChanged: function(sender) {
      var container = this.$.weekDays.children.filter(function filter(x) { return (x.name=="client") } );
      var days = container[0].children;
      for(var i=0;i<days.length;i++) {
          if(days[i] != sender) {
          	  days[i].setDepressed(false);
          }
      }
      this.reloadData();
  },
  
  weekChanged: function(sender) {
      this.reloadData();
  },
  
/*  list = [["-",
		 {name:"Компьютерная электроника",
		  teacher:"Виноградов Ю.Н.",
		  where:"302-18",
		  type:"L"},
		 {name:"Системное программирование",
		  teacher:"Мусина Т.В.",
		  where:"305-18",
		  type:"L"}]];*/
  
  getItemInfo: function(r, inIndex) {
  	  var title = (inIndex+1)+": ";
  	  var desc = "";
  	  if (r == "-") {
	  	  title += "";
	  	  desc += "Нет пары";
  	  } else {
	      title += r.title;
	      desc += r.audience + " " + r.lecturer;
      }
      return {title:title, desc:desc};
  },
  
  getListItem: function(inSender, inIndex) {
	if (!localStorage["day"+this.currentDay]) return false;
	if (!JSON.parse(localStorage["day"+this.currentDay]).subjects) return false;
	var list = JSON.parse(localStorage["day"+this.currentDay]).subjects;
	var r = list[inIndex];
  	
  	if (r) {
  	  info = this.getItemInfo(r, inIndex);
      this.$.title.setCaption(info.title);
	  this.$.description.setContent(info.desc);
      return true;
  	}
  	return false;
 },
 
  getEditListItem: function(inSender, inIndex) {
	if (!localStorage["day"+this.currentDay]) return false;
	if (!JSON.parse(localStorage["day"+this.currentDay]).subjects) return false;
	var list = JSON.parse(localStorage["day"+this.currentDay]).subjects;
	var r = list[inIndex];
  	
  	if (r) {
  	  info = this.getItemInfo(r, inIndex);
      this.$.editTitle.setCaption(info.title);
	  this.$.editDescription.setContent(info.desc);
      return true;
  	}
  	return false;
 },
 
 editClicked: function(sender) {
 	this.$.editPopup.openAtCenter();
 	this.$.editDayLabel.setContent(this.currentDayLabel);
 	this.$.editSubjectsList.render();
 },
 
 onLoad: function() {
 	 this.reloadData();
 },
 
 editAddClick: function() {
     if (!localStorage["day"+this.currentDay]) {
         localStorage["day"+this.currentDay] = "{}";
     }
     data = JSON.parse(localStorage["day"+this.currentDay]);
     if (!data.subjects) {
     	data.subjects = [];
     }
     data.subjects.push({title:"Empty", lecturer:"Nobody", audience:"?"});
     localStorage["day"+this.currentDay] = JSON.stringify(data);
     this.$.editSubjectsList.render();
 },
 
 editItemClick: function(sender, event) {
 	data = JSON.parse(localStorage["day"+this.currentDay]).subjects[event.rowIndex];
 	this.$.editSubject.setValue(data.title);
 	this.$.editLecturer.setValue(data.lecturer);
 	this.$.editAudience.setValue(data.audience);
 	this.currentEditingItem = event.rowIndex;
	this.$.editItemPopup.openAtCenter();
 },
 
 editSubjectChange: function(sender) {
 	data = JSON.parse(localStorage["day"+this.currentDay]);
 	data.subjects[this.currentEditingItem].title = this.$.editSubject.getValue();
 	localStorage["day"+this.currentDay] = JSON.stringify(data);
    this.$.editSubjectsList.render();
    this.$.subjectsList.render();
 },

 editLecturerChange: function(sender) {
 	data = JSON.parse(localStorage["day"+this.currentDay]);
 	data.subjects[this.currentEditingItem].lecturer = this.$.editLecturer.getValue();
 	localStorage["day"+this.currentDay] = JSON.stringify(data);
    this.$.editSubjectsList.render();
    this.$.subjectsList.render();
 },
 
 editAudienceChange: function(sender) {
 	data = JSON.parse(localStorage["day"+this.currentDay]);
 	data.subjects[this.currentEditingItem].audience = this.$.editAudience.getValue();
 	localStorage["day"+this.currentDay] = JSON.stringify(data);
    this.$.editSubjectsList.render();
    this.$.subjectsList.render();
 }

});