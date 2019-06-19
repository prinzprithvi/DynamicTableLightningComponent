# DynamicTableLightningComponent
DynamicTableComponent which works with any salesforce SObject and field configuration along with one level parent field configuration

Configure fieldAPI's,ObjectAPI and replaceHeaders attributes, and you are all set to go.

#JS

All column data are readonly; First column is linked to "Done" event, which is fired on selection of record, it will pass the record details so that parent component can handle and use the event data for further processing.

Usage,
From a parent component add DynamicTableComponent as a child component and pass configuring attributes, as shown below.
	
	<c:DynamicTableComponent aura:id="dtcContact" fieldAPIs="['Name','Account.Name','Title']" objectAPI="Contact" initialSearchString="{!v.selectedContactRecord.Name}" replaceHeaders="Account.Name:Company Name"/>
	
	
fork's are welcome

Happy Coding :)