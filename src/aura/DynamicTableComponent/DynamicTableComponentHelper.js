({
    getRecordsHelper : function(component, event, searchText) {
        debugger;
        var fieldAPIs = component.get("v.fieldAPIs");
        var objectAPI = component.get("v.objectAPI");
        if(fieldAPIs != undefined && objectAPI != undefined){
            var action = component.get('c.getRecords');
            action.setParams({
                "fieldAPIs" : fieldAPIs,
                "sObjectType" : objectAPI,
                "filter" : searchText,
                "replaceHeaders":component.get("v.replaceHeaders")
            });

            action.setCallback(this, function(response){
                var state = response.getState();
                if( state === 'SUCCESS' && component.isValid()){
                    //component.find("dynamicBody").set("v.body",[]);
                    component.find('sfdcDiv').set("v.body",[]);
                    var responseValue = response.getReturnValue();
                    var objectValue   = responseValue.sObjectData;
                    var fieldList     = responseValue.fieldList;
                    debugger;
                    component.set("v.searchResult",objectValue);
                    /* Create Dynamic Table */
                    var sObjectDataTableHeader = [];
                    // Create table Header
                    for (var i=0; i <  fieldList.length; i++) {
                        sObjectDataTableHeader.push(fieldList[i].label);
                    }
                    console.log(sObjectDataTableHeader);
                    //Get the count of columns.
                    var columnCount = sObjectDataTableHeader.length;
                    //Create a HTML Table element.
                    var table = document.createElement("TABLE");
                    table.classList.add("slds-table");
                    table.classList.add("slds-table_bordered");
                    table.classList.add("slds-table_cell-buffer");
                    table.style="table-layout: fixed;width: 100%;";
                    //table.border = "1";
                    //Add the header row.
                    var row = table.insertRow(-1);
                    row.classList.add("slds-text-title_caps");

                    for (var i = 0; i < columnCount; i++) {
                        var headerCell = document.createElement("TH");
                        headerCell.setAttribute("scope", "col");

                        var div = document.createElement("DIV");
                        div.className = "slds-truncate";
                        div.title = sObjectDataTableHeader[i];
                        div.innerHTML = sObjectDataTableHeader[i];
                        headerCell.appendChild(div);
                        //headerCell.className='hearderClass';
                        row.appendChild(headerCell);
                    }
                    var dvTable = document.getElementById("sfdctable");
                    dvTable.innerHTML = "";
                    dvTable.appendChild(table);
                    /* Create Dynamic Table End */
                    
                    if(objectValue.length){
                        for(var j=0; j < objectValue.length; j++){
                            // Dynamic table Row
                            row = table.insertRow(-1);
                            // Dynamic Table Row End
                            for (var i=0; i <  fieldList.length; i++) {
                                // Dynamic table Row
                                var cell = row.insertCell(-1);
                                var div = document.createElement("DIV");
                                div.className = "slds-truncate";

                                if(i == 0){
                                    var a = document.createElement("A");

                                    var headerVal = '';
                                    if(fieldList[i].apiName != undefined && fieldList[i].apiName.indexOf('.') != -1){
                                        var parentTree = fieldList[i].apiName.split(".");
                                        if(parentTree.length > 1 && objectValue[j].hasOwnProperty([parentTree[0]][parentTree[1]]))
                                            headerVal = objectValue[j][parentTree[0]][parentTree[1]];
                                    }
                                    if(headerVal != '')
                                         a.innerHTML = headerVal;
                                    else
                                        a.innerHTML = objectValue[j][fieldList[i].apiName];
                                    a.setAttribute("name",objectValue[j].Id);
                                    
                                    a.addEventListener("click",function(){
                                        debugger;
                                        var records = component.get("v.searchResult");
                                        var rec = this.getAttribute("name");
                                        for(var i = 0; i < records.length; i++){
                                            if(rec == records[i].Id){
                                                component.set("v.selectedRecord",records[i]);
                                                break;
                                            }
                                        }
                                         
                                        var compEvent = component.getEvent("doneEvent");
                                        compEvent.setParams({"type":objectAPI});  
                                        compEvent.fire();

                                    },false);
                                    div.appendChild(a);
                                }else{

                                    if(fieldList[i].dataType == "BOOLEAN"){
                                        var checkbox = document.createElement("INPUT");
                                        checkbox.type = "checkbox";
                                        checkbox.name = "name";
                                        var headerVal = '';
                                        if(fieldList[i].apiName != undefined && fieldList[i].apiName.indexOf('.') != -1){
                                            var parentTree = fieldList[i].apiName.split(".");
                                            if(parentTree.length > 1 && objectValue[j].hasOwnProperty([parentTree[0]][parentTree[1]]))
                                                headerVal = objectValue[j][parentTree[0]][parentTree[1]];
                                        }
                                        if(headerVal != '')
                                            checkbox.checked = headerVal;
                                        else
                                            checkbox.checked = objectValue[j][fieldList[i].apiName];
                                        checkbox.id = objectValue[j].Id;
                                        checkbox.disabled = true;
                                        div.appendChild(checkbox);
                                    }else{

                                        var headerVal = '';
                                        if(fieldList[i].apiName != undefined && fieldList[i].apiName.indexOf('.') != -1){
                                            var parentTree = fieldList[i].apiName.split(".");
                                            if(parentTree.length > 1 && objectValue[j].hasOwnProperty([parentTree[0]][parentTree[1]]))
                                                headerVal = objectValue[j][parentTree[0]][parentTree[1]];
                                        }
                                        if(headerVal != '')
                                            div.innerHTML = headerVal;
                                        else if(objectValue[j][fieldList[i].apiName] != undefined)
                                            div.innerHTML = objectValue[j][fieldList[i].apiName];
                                        else 
                                            div.innerHTML = "";

                                        
                                        
                                    }

                                    
                                }
                                cell.appendChild(div);
                                //cell.innerHTML = objectValue[j][fieldList[i].apiName];
                                //omponent.set('v.isSending' , false);
                                
                            }
                        }
                    }else{
                        
                    }
                }else{
                    var errors = response.getError();
                    $A.log('Error Details '+errors);
                    if( errors || errors[0].message){
                        console.log('Error Details '+errors[0].message);
                    }
                }
            });
            $A.enqueueAction(action);
        }
        else{
            //component.set('v.isSending' , false);
        }


    },

    goHelper : function(component, event) {
        var params = event.getParam('arguments');
        if (params) {
            var searchText = params.searchString;
            this.getRecordsHelper(component,event,searchText);
            
        }
    },

    onSelect : function(component, event){
        debugger;
    } 
})