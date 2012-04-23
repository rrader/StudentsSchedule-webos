enyo.kind({
  name: "RRader.Schedule",
  kind: enyo.VFlexBox,
  components: [
  	{kind: "PageHeader", content: "Students Schedule"},
  	
  	{kind: "Control", flex:1, layoutKind: "HFlexLayout", components: [
	  	{kind: "Scroller", flex: 3, components: [
	          {content: "Monday"},
	          {kind: "VirtualRepeater", name: "mondayList", onSetupRow: "getListItem",
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
	            {kind: "RowGroup", name:"weekDays", layoutKind: "VFlexLayout", components: [
	                {content:"Понедельник", onclick: "dayChanged"},
	                {content:"Вторник", onclick: "dayChanged"},
	                {content:"Среда", onclick: "dayChanged"},
	                {content:"Четверг", onclick: "dayChanged"},
	                {content:"Пятница", onclick: "dayChanged"},
	                {content:"Суббота", onclick: "dayChanged"},
	                {content:"Воскресенье", onclick: "dayChanged"}
	            ]}
	        ]}
		]}
	]}
  ],
  dayChanged: function(sender) {
  	
  }
  ,
  getListItem: function(inSender, inIndex) {
  list = [["-",
		 {name:$L("Компьютерная электроника"),
		  teacher:"Виноградов Ю.Н.",
		  where:"302-18",
		  type:"L"},
		 {name:"Системное программирование",
		  teacher:"Мусина Т.В.",
		  where:"305-18",
		  type:"L"}]];
  	var r = list[0][inIndex];
  	if (r) {
  	  var title = (inIndex+1)+": ";
  	  var desc = "";
  	  if (r == "-") {
	  	  title += "";
	  	  desc += "Нет пары";
  	  } else {
	      title += r.name;
	      desc += r.where + " " + r.teacher;
      }
      this.$.title.setCaption(title);
	  this.$.description.setContent(desc);
      return true;
  	}
  	return false;
 }
  
});