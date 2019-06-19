# DynamicTableLightningComponent
DynamicTableComponent which works with any salesforce SObject and field configuration along with one level parent field configuration

Configure fieldAPI's and ObjectAPI attribute, and you are all set to go.

JS

All column data are readonly; First column is hyperlinked to detail of specific record.

Done event is fired on selection of record with record details so that parent component can handle the event for further processing.

Usage
	
	From a parent component add DynamicTableComponent as a child component and pass configuring attributes, as shown below.
	
	<c:DynamicTableComponent aura:id="dtcContact" fieldAPIs="['Name','Account.Name','Title']" objectAPI="Contact" initialSearchString="{!v.selectedContactRecord.Name}" replaceHeaders="Account.Name:Company Name"/>
	
	
fork's are welcome

Happy Coding :)