
  var resources, activities, portals, current_names, distribution;
  var current_activity_index, current_portal_index, current_name_index, current_resource_set;
  // var myID = uniqueID();


  // function split_runid (runid){
  //   var substrings = runid.split("-");
  //   return {org_name:substrings[0],group_name:substrings[1],section_name:substrings[2],cluster_name:substrings[0]+'-'+substrings[1]};
  // }




////////////////////////////////////////////






  // function refresh_status_bar(){
  //   build_status_menu('application',applications);
  //   build_status_menu('org',orgs);
  //   build_status_menu('cluster',clusters);
  //   build_status_menu('section',sections);
  //   build_status_menu('activity',activities);
  //   build_status_menu('portal',portals);
  // };

  function is_activity_dependent(portal){
    return (portal.type == 'educator' || portal.type == 'learner' || portal.type == 'public')
  }

  function show_portal_type (portal) {
    return (portal.type == 'partner' || portal.type == 'learner' || portal.type == 'public' || portal.type == 'unknown')
  }

  // function build_status_menu(header, item_list){
  //   $('#' + header).empty();
  //    // if (item_list.length > 1)
  //   //   $('#' + header).empty().append('<option value="-1" class=status>' + header + '</li>');
  //   for (var i=0; i<item_list.length; i++){
  //     if (header == 'portal'){
  //       if (query_parameters.hasOwnProperty('continue')){
  //         if (item_list[i].type == "system" || item_list[i].type == "application") continue;
  //       } else {
  //         switch (current_portal.type) {
  //           case 'unknown': break;
  //           case 'system': if (item_list[i].type != "system") continue; break;
  //           case 'application': if (item_list[i].type != "application") continue; break;
  //           case 'designer': if (item_list[i].type == "system" || item_list[i].type == "application") continue; break;
  //           case 'educator': if (item_list[i].type == "system" || item_list[i].type == "application") continue; break;
  //           case 'learner': if (item_list[i].type != "learner") continue; break;
  //           case 'public': if (item_list[i].type != "public") continue; break;
  //           case 'partner': if (item_list[i].type != "partner") continue; break;
  //         };
  //       }
  //     };
  //     $('#' + header).append('<option value="' + item_list[i].ID + 
  //       '" class=status>' + item_list[i].printName + '</li>');
  //   }
  //   // $('#portal').prepend('<option value="-1" class=status>' + ' portal? ' + '</li>');
  //   // adjust_status_menu_width(header);
  // }

  function adjust_status_menu_width(header){
    $("#width_tmp_option").html($('#' + header + ' option:selected').text()); 
    // alert($('#' + header + ' option:selected').text().length);
    var w = $("#width_tmp_select").width();
    if (w > 500) w = $('#' + header + ' option:selected').text().length * 20;
    $('#' + header).width(w);    

  }

  // function set_selected_option_on_status_menu (header,selected_option_ID){
  //   $("#" + header + " option[value='" + selected_option_ID + "']").prop("selected","selected");
  //   adjust_status_menu_width(header);
  // }

  // function build_sections_array (section_list) { 
  //   var response = [];
  //   for (var i=0; i<section_list.length; i++) {
  //     response.push({ID:i,printName:split_runid(section_list[i]).section});
  //   }
  //   return response;
  // }

  // function build_applications_array(app_id) {
  //   // var response = [{ID:0, printName: app_id}];
  //   var response = [{ID:0, printName: 'roomQuake'}]; // hack for demo
  //   return response;
  // }

  // function build_orgs_array(org) {
  //   var response = [{ID:0, printName: org}];
  //   return response;
  // }

  // function build_clusters_array(cluster) {
  //   var response = [{ID:0, printName: cluster}];
  //   return response;
  // }


  function build_URL(resource){
    var URL;
    if (resource.type == 'cluster') URL = resource.link; 
    else {
        var s = 'http://';
        s += window.location.host + '/';
        s += query_parameters.app_id + '/';
        s += query_parameters.run_id + '/';
        s += 'runs/';
        if (resource.type == 'app') { 
          s += resource.link + '/';
          s += 'index.html' + '?'; 
        } else {
          s += 'roomcast' + '/';
          s += resource.link + '?'; 
        }

        s += 'broker=' + query_parameters.broker + '&';
        s += 'app_id=' + query_parameters.app_id + '&';
        s += 'run_id=' + query_parameters.run_id;
        if (query_parameters.hasOwnProperty('portal_ID')) s += '&portal_ID=' + query_parameters.portal_ID;
        if (query_parameters.hasOwnProperty('name_ID')) s += '&name_ID=' + query_parameters.name_ID;
        if (resource.version != '') s += '&version=' + resource.version;
        URL = s;
    }; 
    return URL;
  };

  function strip_trailing_slash (string) {
    var response = string;
    if (string.slice(-1) == '/') response = string.substring(0,string.length-1);
    return (response);
  }

  function select_resource(obj) { 
    LOCATIONAL_RESOURCE = false;
    var r = '#R' + obj.name;
    if (obj.name.charAt(0) == 'S') {r = "#S" + obj.name.substr(1); LOCATIONAL_RESOURCE = true;};
    console.log($('#resource_bar a'));

    // what's below won't work 
    // for (var i=0; i<$('#resource_bar a').length; i++){ 
    //   if ($('#resource_bar a:eq(' + i + ')').name.substr(1) == 'S') $('#resource_bar a:eq(' + i + ')').css('color', 'green');
    //   else $('#resource_bar a:eq(' + i + ')').css('color', 'black');
    // }
    $('#resource_bar a').css('color', 'black');
    obj.style.color = 'white';
    $('#resource iframe').hide();
    $(r).show();
    // alert(SELECTED_RESOURCE)
  }

  var LOCATIONAL_RESOURCE = false;
 