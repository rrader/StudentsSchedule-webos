enyo.kind({
  name: "RRader.Schedule",
  kind: enyo.VFlexBox,
  components: [
  	{kind: "PageHeader", content: "Students Schedule"},
  	{kind: "Scroller", flex: 1, components: [
  		  {kind: "Item", layoutKind: "VFlexLayout", components: [
                  {content: "Monday"},
          ]},
          {name: "mondayList", id:0, kind: "VirtualRepeater", onSetupRow: "getListItem",
          components: [
              {kind: "Item", layoutKind: "VFlexLayout", components: [
                  {name: "title", kind: "Divider"},
                  {name: "description"}
              ]}
          ]}
      ]}
  ],
  
  getListItem: function(inSender, inIndex) {
  list = [["-",
		 {name:"Компьютерная электроника",
		  teacher:"Виноградов Ю.Н.",
		  where:"302-18",
		  type:"L"},
		 {name:"Системное программирование",
		  teacher:"Мусина Т.В.",
		  where:"305-18",
		  type:"L"}]];
  	var r = list[0][inIndex];
  	if (r) {
  	  if (r == "-") {
	  	  this.$.title.setCaption("");
	      this.$.description.setContent("free");
  	  } else {
	      this.$.title.setCaption(r.name);
	      this.$.description.setContent(r.where+" "+r.teacher);
      }
      return true;
  	}
  	return false;
 }
  
});