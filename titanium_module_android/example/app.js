// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});

var cloudModule = require('org.openmobster.cloud');
var sync = cloudModule.sync();
var channel = "crm_ticket_channel";

var button = Titanium.UI.createButton({title:'Run'});
window.add(button);


function listBeans(oids)
{
	Ti.API.info("----------------------------------------------------");
	
	for(var i=0; i<oids.length; i++)
	{
		var bean = sync.readById(channel,oids[i]);
		
		//getValue
		var oid = bean.oid();
		var title = bean.getValue("title");
		var comment = bean.getValue("comment");
		var customer = bean.getValue("customer");
		var specialist = bean.getValue("specialist");
		
		Ti.API.info("*************************************");
		Ti.API.info("Oid: " + oid);
		Ti.API.info("Title: " + title);
		Ti.API.info("Comment: " + comment);
		Ti.API.info("Customer:"+customer);
		Ti.API.info("Specialist:"+specialist);
	}	
	
	Ti.API.info("----------------------------------------------------");
}

function printNewBean(bean)
{
   Ti.API.info("Printing New Bean");
   Ti.API.info("-------------------------");

   var oid = bean.oid();
   var title = bean.getValue("title");
   var comment = bean.getValue("comment");
   var customer = bean.getValue("customer");
   var specialist = bean.getValue("specialist");
		
   Ti.API.info("*************************************");
   Ti.API.info("OID: "+oid);
   Ti.API.info("Title: " + title);
   Ti.API.info("Comment: " + comment);
   Ti.API.info("Customer:"+customer);
   Ti.API.info("Specialist:"+specialist);
   Ti.API.info("-------------------------");
}


button.addEventListener('click',function(){
    var oids = sync.readAll(channel);
    oids = eval('('+oids+')');
    if(oids != null && oids.length > 0)
    {
		listBeans(oids);
	
		//SetValue
		var updateBean = sync.readById(channel,oids[0]);
		updateBean.setValue("title", "updated://title");
		updateBean.setValue("customer", "updated://customer");
		updateBean.setValue("specialist","updated://specialist");
		updateBean.setValue("comment", "updated://comment");
		updateBean.commit();
	
		//Delete Bean
		var deletedOid = sync.deleteBean(channel,oids[1]);
		Ti.API.info("Deleted: "+deletedOid);
	
		//Add Bean
		var newBean = sync.newBean(channel);
		newBean.setValue("title", "new://title");
		newBean.setValue("comment", "new://comment");
		newBean.setValue("customer", "new://customer");
		newBean.setValue("specialist", "new://specialist");
	    var newBeanId = newBean.commit();
		printNewBean(newBean);
		
		oids = sync.readAll(channel);
		oids = eval('('+oids+')');
		listBeans(oids);
    }
    else
    {
		Ti.API.info("Channel is not booted yet");
    }
});


window.open();