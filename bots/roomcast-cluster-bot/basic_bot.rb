require 'nutella_lib'

puts 'alive'

puts 'Log started ' + Time.now.strftime('%Y-%m-%d %T')

 

# Parse command line arguments
broker, app_id, run_id = nutella.app.parse_args ARGV
# Extract the component_id
component_id = nutella.extract_component_id
# Initialize nutella
# nutella.app.init(broker, app_id, component_id)

nutella.app.init(broker, app_id, component_id)
# (Optional) Set the resourceId
nutella.app.set_resource_id 'my_resource_id'

# require 'socket'
# ip=Socket.ip_address_list.detect{|intf| intf.ipv4_private?}
# ip.ip_address if ipnutella
# host = Socket.gethostname

# puts ip.ip_address

# puts nutella.run_id
# puts nutella.app_id
# puts nutella.component_id
# puts broker


# Uniq ID generator (sequential)

id = nutella.app.persist.get_json_object_store('id')
if id.empty?
  id['data'] = 1000
end

host = nutella.app.persist.get_json_object_store('host')
if host.empty?
  host['data'] = 'localhost'
end

app_log = nutella.app.persist.get_json_object_store('app_log')

if app_log.empty?
  app_log['data'] = ['Log started ' + Time.now.strftime('%Y-%m-%d %T')]
end


roomcast_resources = nutella.app.persist.get_json_object_store('roomcast_resources')

# if roomcast_resources.empty?

#   roomcast_resources['data'] = Array[

#     {'ID':27, 'printName':'resources', 'type':'roomcast', 'link':'resources.html','version':'','description':'resources resource','distribute':true},
#     {'ID':33, 'printName':'activities', 'type':'roomcast', 'link':'activities.html','version':'','description':'activities resource','distribute':true},
#     {'ID':32, 'printName':'portals', 'type':'roomcast', 'link':'portals.html','version':'','description':'portals resource','distribute':true},
#     {'ID':35, 'printName':'distribution', 'type':'roomcast', 'link':'distribution.html','version':'','description':'distribution resource','distribute':true},
#     {'ID':39, 'printName':'names', 'type':'roomcast', 'link':'names.html','version':'','description':'names resource','distribute':true},
#     {'ID':42, 'printName':'designs', 'type':'roomcast', 'link':'designs.html','version':'','description':'designs resource','distribute':true},


#     {'ID':48, 'printName':'clusters', 'type':'roomcast', 'link':'clusters.html','version':'','description':'clusters resource','distribute':false},
#     {'ID':44, 'printName':'sections', 'type':'roomcast', 'link':'sections.html','version':'','description':'sections resource','distribute':false},
#     {'ID':51, 'printName':'host', 'type':'roomcast', 'link':'host.html','version':'','description':'host resource','distribute':false}

#   ]

# end

if roomcast_resources.empty?
  temp_array = Array[]
  unix = 'cd ../../interfaces/roomcast; ls'
  result = `#{unix}`.gsub(/ /,'').split("\n")
  temp_index = 0
  temp_id = 40
  for interface in result
    is_html = interface.include? ".html"
    is_index = interface.include? "index.html"
    is_blank = interface.include? "blank.html"
    if is_html && !is_index && !is_blank
      # distribute = (interface == 'resources.html')
      p_name = interface.gsub(/.html/,'')
      element = {'ID':temp_id, 'printName':p_name, 'type':'roomcast', 'link':interface,'version':'','description':'app resource','distribute':false}
      temp_array[temp_index] = element
      temp_index = temp_index + 1
      temp_id = temp_id + 1
    end
  end
  roomcast_resources['data'] = temp_array
end





app_resources = nutella.app.persist.get_json_object_store('app_resources')


if app_resources.empty?
  temp_array = Array[]
  unix = 'cd ../../interfaces; ls -1d -- */ '
  result = `#{unix}`.gsub(/ /,'').split("\n")
  temp_index = 0
  temp_id = 100
  for interface in result
    int = interface.chop
    puts int
    if int != 'roomcast'
      element = {'ID':temp_id, 'printName':int, 'type':'app', 'link':int,'version':'','description':'app resource'}
      temp_array[temp_index] = element
      temp_index = temp_index + 1
      temp_id = temp_id + 1
    end
  end
  app_resources['data'] = temp_array
end


# ps is the section used in the public portals

ps = nutella.app.persist.get_json_object_store('ps')
if ps.empty?
  ps.merge!("dummy" => 'public undefined')
end

nutella.app.net.handle_requests_on_all_runs('get_ps', lambda do |message, run_id, from|
  if !ps.has_key? message['cluster']
    ps.merge!(message['cluster'] => message['section'])
  end
  return ps[message['cluster']]
end)

# nutella.app.net.handle_requests_on_all_runs('set_ps', lambda do |new_section, run_id, from|
#   ps['data'] = new_section
# end)



enactments = nutella.app.persist.get_json_object_store('enactments')

if enactments.empty?
    activity = 18
    myURL = 'http://' + 'HOST_PLACEHOLDER' + ':57880/' + nutella.app_id + '/AD-MIN-0/runs/roomcast/index.html?' + 'broker=' + 'HOST_PLACEHOLDER' + '&app_id=' + nutella.app_id + '&run_id=' + 'AD-MIN-0'
          
    tinyURL = ''
    names = Array [ 
                    {'ID': 1, 'printName': 'manager', 'portalID': 841},
                    {'ID': 2, 'printName': 'manager', 'portalID': 216}
                    # {'ID': 3, 'printName': 'manager', 'portalID': 377},
                    # {'ID': 4, 'printName': 'teacher', 'portalID': 443}
                  ]
    description = ''
    enactment = {"current_activity_ID": activity, "names": names, "myURL": myURL, "tinyURL": tinyURL, "description": description}
    enactments.merge!({'AD-MIN-0' => enactment})
end

cluster_designs = nutella.app.persist.get_json_object_store('cluster_designs') 


if cluster_designs.empty?
    activities = Array [{'ID': 18, 'printName': 'planning','description':'planning','slides':''}]

    portals = Array [ 
                      {'ID': 841, 'printName':'system', 'description':'','type':'system','pw':'nutella'},
                      {'ID': 216, 'printName':'application', 'description':'','type':'application','pw':'nutella'}
                      # {'ID': 377, 'printName':'designer', 'description':'','type':'designer','pw':'nutella'},
                      # {'ID': 443, 'printName':'educator', 'description':'','type':'educator','pw':'nutella'}
                    ]

                    # the other portals types are 'learner','public',and 'partner'

    distribution = Array  [
                            # {'portal_ID':841, 'activity_ID':0, 'resource_ID':27},
                            # # {'portal_ID':841, 'activity_ID':0, 'resource_ID':51},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':27},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':48},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':44}

                          ]

    cluster_resources = Array []

    includes = Array []

    description = "administrative cluster"

    pw = "nutella"

    contact = 'moher@uic.edu'

    alt_title = ''

    shared = false

    archived = false

    design = {"activities": activities, "portals": portals, "distribution": distribution, "cluster_resources": cluster_resources, 
      "includes": includes, "description":description, "pw":pw, "contact":contact, "alt_title":alt_title,"shared":shared,"archived": archived}
    
    cluster_designs.merge!({'AD-MIN' => design})
    # nutella.app.net.publish_to_all_runs('new_cluster_introduced',{});
end

nutella.app.net.handle_requests_on_all_runs('get_app_log', lambda do |run, run_id, from|
  puts app_log['data']
  return app_log['data']
end)





nutella.app.net.handle_requests_on_all_runs('get_app_resources', lambda do |run, run_id, from|
  return app_resources['data']
end)

nutella.app.net.handle_requests_on_all_runs('set_app_resources', lambda do |resources, run_id, from|
  app_resources['data'] = resources
  nutella.app.net.publish_to_all_runs('app_resources_update', app_resources['data'])
  return 'success'
end)


nutella.app.net.handle_requests_on_all_runs('get_id', lambda do |run, run_id, from|
  id['data'] = id['data'] + 1
  return id['data']
end)

nutella.app.net.handle_requests_on_all_runs('set_id', lambda do |msg, run_id, from|
  id['data'] = msg
end)

nutella.app.net.handle_requests_on_all_runs('get_host', lambda do |run, run_id, from|  
  return host['data']
end)

nutella.app.net.handle_requests_on_all_runs('set_host', lambda do |thishost, run_id, from|  

  host['data'] = thishost
end)


# resources 

# roomcast resources



nutella.app.net.handle_requests_on_all_runs('get_roomcast_resources', lambda do |run, run_id, from|
  return roomcast_resources['data']
end)


nutella.app.net.handle_requests_on_all_runs('set_roomcast_resources', lambda do |resources, run_id, from|
  roomcast_resources['data'] = resources
  # puts resources
  nutella.app.net.publish_to_all_runs('roomcast_resources_update', roomcast_resources['data'])
  return 'success'
end)


# app resources


nutella.app.net.handle_requests_on_all_runs('get_app_resources', lambda do |run, run_id, from|
  return app_resources['data']
end)

nutella.app.net.handle_requests_on_all_runs('set_app_resources', lambda do |resources, run_id, from|
  app_resources['data'] = resources
  nutella.app.net.publish_to_all_runs('app_resources_update', app_resources['data'])
  return 'success'
end)


# enactments (runs)

nutella.app.net.handle_requests_on_all_runs('enactment_exists', lambda do |run, run_id, from|
  if !enactments.has_key? run
    unix = 'cd ../..; nutella stop ' + run
    return `#{unix}`.gsub(/ /,'').split("\n")
  else
    nutella.app.net.publish_to_run('AD-MIN-0','enactment_initiated',run);
    return 'true'
  end
end)


nutella.app.net.handle_requests_on_all_runs('stop_all_runs', lambda do |message, run_id, from|

  unix = 'cd ../..; nutella runs'
  back = `#{unix}`
  result = back.split("\n")
  # puts (result[0])
  result.shift
  # puts (result[0])
  for run in result do
    # puts run
    if (run != '  AD-MIN-0')
      unix = 'cd ../..; nutella stop ' + run
      `#{unix}`
      temp = run.split('-')
      nutella.app.net.publish_to_all_runs('cluster_fuck', temp[0] + '-' + temp[1])
    end
  end
end)

nutella.app.net.handle_requests_on_all_runs('stop_cluster_runs', lambda do |cluster, run_id, from|
  # puts cluster
  unix = 'cd ../..; nutella runs'
  back = `#{unix}`
  result = back.split("\n")
  # puts (result[0])
  result.shift
  # puts (result[0])
  for run in result do
    temp = run.split('-')
    c = temp[0] + '-' + temp[1]
    # puts c
    if (c == ('  ' + cluster))
      # puts 'got here'
      unix = 'cd ../..; nutella stop ' + run
      `#{unix}`
      nutella.app.net.publish_to_all_runs('cluster_fuck', cluster)
    end
  end
end)



# strategy for starting all runs is different, and requires addition of 'archived' clusters





# used to be get_all_enactments_for_this_cluster

nutella.app.net.handle_requests_on_all_runs('get_all_section_names', lambda do |cluster, run_id, from|
  all_enactments = enactments.keys
  section_list = Array []
  for element in all_enactments do
    temp = element.split('-')
    if (temp[0] + '-' + temp[1]) == cluster
      section_list.push(temp[2])
    end
  end
  return section_list
end)


nutella.app.net.handle_requests_on_all_runs('create_enactment', lambda do |run, run_id, from|
  if !enactments.has_key? run
    activity = 18
    myURL = 'http://' + 'HOST_PLACEHOLDER' + ':57880/' + nutella.app_id + '/' + run + '/runs/roomcast/index.html?' + 'broker=' + 'HOST_PLACEHOLDER' + '&app_id=' + nutella.app_id + '&run_id=' + run
          
    tinyURL = ''
    names = Array [ 
                    # {'ID': 1, 'printName': 'manager', 'portalID': 841},
                    # {'ID': 2, 'printName': 'manager', 'portalID': 216},
                    # {'ID': 3, 'printName': 'manager', 'portalID': 377},
                    {'ID': 4, 'printName': 'teacher', 'portalID': 443}
                  ]

# here is where we need to insert code to copy names from public portals of this clusters, if they are shared
    dirty = false #no prior enactments
    t = run.split('-')
    cluster = t[0] + '-' + t[1]
    cs = cluster_designs[cluster]['shared']
    p = cluster_designs[cluster]['portals']
    all_enactments = enactments.keys
    for element in all_enactments do
      temp = element.split('-')
      if (temp[0] + '-' + temp[1]) == cluster
        dirty = true
        for name in enactments[element]['names'] do
          for portal in p do
            if (portal['ID'] == name['portalID'] && ((portal['type'] == 'public' && cs) || portal['type'] == 'partner' || portal['type'] == 'designer'))
              names.push(name)
            end
          end
        end
      end
    end
    
    if !dirty
      names.unshift({'ID': 3, 'printName': 'manager', 'portalID': 377})
    end






    description = ''
    enactment = {"current_activity_ID": activity, "names": names, "myURL": myURL, "tinyURL": tinyURL, "description": description}
    enactments.merge!({run => enactment})
  end    
  return enactments[run]
end)





nutella.app.net.handle_requests_on_all_runs('delete_enactment', lambda do |run, run_id, from|
  if enactments.has_key? run
    enactments.delete(run)
    unix = 'cd ../..; nutella stop ' + run
    `#{unix}`
  end
  nutella.app.net.publish_to_run(run,'suicide','section deleted');
  return 'success'
end)




nutella.app.net.handle_requests_on_all_runs('stop_enactment', lambda do |run, run_id, from|
  if enactments.has_key? run
    unix = 'cd ../..; nutella stop ' + run
    `#{unix}`
  end
  nutella.app.net.publish_to_run(run,'suicide','section stopped');
  return 'success'
end)





nutella.app.net.handle_requests_on_all_runs('start_enactment', lambda do |run, run_id, from|
  if enactments.has_key? run
    unix = 'cd ../..; nutella start ' + run + ' 2>&1'
    output = `#{unix}`
    puts output
  end
  return 'success'
end)







nutella.app.net.handle_requests_on_all_runs('get_section', lambda do |run, run_id, from|
  if !enactments.has_key? run
    return 'fail'
  else
    return enactments[run]
  end
end)

nutella.app.net.handle_requests_on_all_runs('update_section', lambda do |message, run_id, from|
  if !enactments.has_key? run
    return 'fail'
  else
    return enactments[run]
  end
end)

nutella.app.net.handle_requests_on_all_runs('change_section', lambda do |message, run_id, from|
  ps.merge!(message['cluster'] => message['section'])
  nutella.app.net.publish_to_all_runs('teacher_changed_section',message);
  return 'success'
end)


nutella.app.net.handle_requests_on_all_runs('set_current_activity', lambda do |message, run_id, from|
  run = message['run']
  new_current_activity = message['activity']['ID']
  new_URL = enactments[run]['myURL']
  new_tinyURL = enactments[run]['tinyURL']
  new_description = enactments[run]['description']
  new_names = enactments[run]['names']
  new_enactment = {"current_activity_ID": new_current_activity, "names": new_names, "myURL": new_URL, "tinyURL": new_tinyURL, "description": new_description}
  enactments.merge!({run => new_enactment})
  nutella.app.net.publish_to_run(run,'current_activity_changed', message['activity']);
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('set_names', lambda do |message, run_id, from|
  run = message['run']
  new_current_activity = enactments[run]['current_activity_ID']
  new_URL = enactments[run]['myURL']
  new_tinyURL = enactments[run]['tinyURL']
  new_description = enactments[run]['description']
  new_names = message['names']
  new_enactment = {"current_activity_ID": new_current_activity, "names": new_names, "myURL": new_URL, "tinyURL": new_tinyURL, "description": new_description}
  enactments.merge!({run => new_enactment})
  nutella.app.net.publish_to_run(run,'names_update', {enactment: run, names: new_names});
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('save_section_tinyURL_and_description', lambda do |message, run_id, from|
  run = message['run']
  new_current_activity = enactments[run]['current_activity_ID']
  new_URL = enactments[run]['myURL']
  new_tinyURL = message['tinyURL']
  new_description = message['description']
  new_names = enactments[run]['names']
  new_enactment = {"current_activity_ID": new_current_activity, "names": new_names, "myURL": new_URL, "tinyURL": new_tinyURL, "description": new_description}
  enactments.merge!({run => new_enactment})
  return 'success'
end)


# cluster designs


nutella.app.net.handle_requests_on_all_runs('delete_cluster', lambda do |message, run_id, from|
  cluster_designs.delete(message)
  components = message.split('-')
  all_enactments = enactments.keys
  for element in all_enactments do
    temp = element.split('-')
    if components[0] == temp[0] && components[1] == temp[1]
      enactments.delete(element)
      unix = 'cd ../..; nutella stop ' + element
      `#{unix}`
    end
  end
  nutella.app.net.publish_to_all_runs('cluster_list_update',{});
  temp = element.split('-')
  nutella.app.net.publish_to_all_runs('cluster_fuck', message)
end)



nutella.app.net.handle_requests_on_all_runs('get_cluster', lambda do |cluster, run_id, from|
  if !cluster_designs.has_key? cluster
    return 'fail'
  else
    return cluster_designs[cluster]
  end
end)

nutella.app.net.handle_requests_on_all_runs('get_non_archived_clusters', lambda do |message, run_id, from|
  c = cluster_designs.keys
  result = Array []
  for cluster in c do
    if !cluster_designs[cluster]['archived']
      result.push(cluster)
    end
  end
  return result
end)



nutella.app.net.handle_requests_on_all_runs('get_cluster_designs', lambda do |run, run_id, from|
  return cluster_designs
end)

nutella.app.net.handle_requests_on_all_runs('set_cluster_designs', lambda do |message, run_id, from|
  cluster_designs.merge!(message)
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('get_enactments', lambda do |run, run_id, from|
  return enactments
end)

nutella.app.net.handle_requests_on_all_runs('get_enactment_names', lambda do |run, run_id, from|
  return enactments.keys
end)

nutella.app.net.handle_requests_on_all_runs('set_enactments', lambda do |message, run_id, from|
  enactments.merge!(message)
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('create_cluster', lambda do |message, run_id, from|
  cluster = message['cluster']
  if !cluster_designs.has_key? cluster
    activities = Array [{'ID': 18, 'printName': 'planning','description':'planning','slides':''}]

    portals = Array [ 
                      # {'ID': 841, 'printName':'system', 'description':'','type':'system'},
                      # {'ID': 216, 'printName':'application', 'description':'','type':'application'},
                      {'ID': 377, 'printName':'designer', 'description':'','type':'designer',pw:'roomcast'},
                      {'ID': 443, 'printName':'educator', 'description':'','type':'educator',pw:'roomcast'}
                    ]

                    # the other portals types are 'learner','public',and 'partner'

    distribution = Array  [
                            # {'portal_ID':841, 'activity_ID':0, 'resource_ID':27},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':27},
                            # {'portal_ID':841, 'activity_ID':0, 'resource_ID':24},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':24},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':48},
                            # {'portal_ID':216, 'activity_ID':0, 'resource_ID':44},
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':27}, 
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':33},
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':32},
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':35},
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':39},
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':24},
                            # {'portal_ID':377, 'activity_ID':0, 'resource_ID':42}

                          ]

    cluster_resources = Array []

    includes = Array []

    description = message['description']

    pw = message['pw']

    contact = message['contact']

    alt_title = message['alt_title']

    shared = message['shared']

    archived = message['archived']

    design = {"activities": activities, "portals": portals, "distribution": distribution, "cluster_resources": cluster_resources, 
      "includes": includes, "description":description, "pw":pw, "contact":contact,"alt_title":alt_title,"shared":shared,"archived": archived}
    
    cluster_designs.merge!({cluster => design})
    nutella.app.net.publish_to_all_runs('cluster_list_update',{});
    return 'success'
  end
end)


nutella.app.net.handle_requests_on_all_runs('get_all_clusters_list', lambda do |message, run_id, from|
  temp = cluster_designs.keys
  temp = temp.sort
  return temp
end)

nutella.app.net.handle_requests_on_all_runs('get_cluster_info_pw', lambda do |message, run_id, from|
  return {"description": cluster_designs[message]['description'], "pw": cluster_designs[message]['pw'],"contact":cluster_designs[message]['contact'],
    "alt_title":cluster_designs[message]['alt_title'],"shared":cluster_designs[message]['shared'],"archived": cluster_designs[message]['archived']}
end)

# nutella.app.net.handle_requests_on_all_runs('clone_cluster', lambda do |message, run_id, from|
#   destination = message['destination']
#   source = message['source']
#   cluster_designs.merge!(destination => cluster_designs[source])
#   return 'success'
# end)



nutella.app.net.handle_requests_on_all_runs('clone_cluster', lambda do |message, run_id, from|
  destination = message['destination']
  cluster = message['source']
  new_portals = cluster_designs[cluster]['portals']
  new_activities = cluster_designs[cluster]['activities']
  new_distribution = cluster_designs[cluster]['distribution']
  new_includes = cluster_designs[cluster]['includes']
  new_cluster_resources = cluster_designs[cluster]['cluster_resources']
  new_description = cluster_designs[cluster]['description']
  new_pw = cluster_designs[destination]['pw']
  new_contact = cluster_designs[destination]['contact']
  new_alt_title = cluster_designs[destination]['alt_title']
  new_shared = cluster_designs[destination]['shared']  
  new_archived = false
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, 
    "includes": new_includes,"description":new_description,"contact":new_contact,"alt_title":new_alt_title,"shared":new_shared,"archived":new_archived}
  cluster_designs.merge!({destination => new_design})
  # delete and kill all prior enactments

  destination_components = message['destination'].split('-')
  all_enactments = enactments.keys
  for element in all_enactments do
    temp = element.split('-')
    if destination_components[0] == temp[0] && destination_components[1] == temp[1]
      enactments.delete(element)
      unix = 'cd ../..; nutella stop ' + element
      `#{unix}`
    end
  end
  nutella.app.net.publish_to_all_runs('cluster_list_update',{});
  nutella.app.net.publish_to_all_runs('cluster_fuck', message)
  return 'success'
end)



nutella.app.net.handle_requests_on_all_runs('set_cluster_resources', lambda do |message, run_id, from|
  app_log['data'] = app_log['data'].push(Time.now.strftime('%Y-%m-%d %T') + " | " + run_id + " | " + "RESOURCE UPDATE")
  cluster = message['cluster']
  new_portals = cluster_designs[cluster]['portals']
  new_activities = cluster_designs[cluster]['activities']
  new_distribution = cluster_designs[cluster]['distribution']
  new_includes = message['includes']
  new_cluster_resources = message['resources']
  new_description = cluster_designs[cluster]['description']
  new_pw = cluster_designs[cluster]['pw']
  new_contact = cluster_designs[cluster]['contact']
  new_alt_title = cluster_designs[cluster]['alt_title']
  new_shared = cluster_designs[cluster]['shared']
  new_archived = cluster_designs[cluster]['archived']
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, 
    "includes": new_includes,"description":new_description,"contact":new_contact,"alt_title":new_alt_title,"shared":new_shared,"archived":new_archived}
  cluster_designs.merge!({cluster => new_design})
  nutella.app.net.publish_to_all_runs('cluster_resources_update', {'cluster': cluster, 'resources': new_cluster_resources, 'includes': new_includes})
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('set_cluster_includes', lambda do |message, run_id, from|
  # puts message
  cluster = message['cluster']
  new_portals = cluster_designs[cluster]['portals']
  new_activities = cluster_designs[cluster]['activities']
  new_distribution = cluster_designs[cluster]['distribution']
  new_cluster_resources = message['resources']
  new_includes = message['includes']
  new_description = cluster_designs[cluster]['description']
  new_pw = cluster_designs[cluster]['pw']
  new_contact = cluster_designs[cluster]['contact']
  new_alt_title = cluster_designs[cluster]['alt_title']
  new_shared = cluster_designs[cluster]['shared']
  new_archived = cluster_designs[cluster]['archived']
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, 
    "includes": new_includes,"description":new_description,"contact":new_contact,"alt_title":new_alt_title,"shared":new_shared,"archived":new_archived}
  cluster_designs.merge!({cluster => new_design})
  nutella.app.net.publish_to_all_runs('cluster_resources_update', {'cluster': cluster, 'resources': new_cluster_resources, 'includes': new_includes})
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('set_cluster_activities', lambda do |message, run_id, from|
  app_log['data'] = app_log['data'].push(Time.now.strftime('%Y-%m-%d %T') + " | " + run_id + " | " + "ACTIVITY UPDATE")
  cluster = message['cluster']
  new_portals = cluster_designs[cluster]['portals']
  new_activities = message['cluster_activities']
  new_distribution = cluster_designs[cluster]['distribution']
  new_cluster_resources = cluster_designs[cluster]['cluster_resources']
  new_includes = cluster_designs[cluster]['includes']
  new_description = cluster_designs[cluster]['description']
  new_pw = cluster_designs[cluster]['pw']
  new_contact = cluster_designs[cluster]['contact']
  new_alt_title = cluster_designs[cluster]['alt_title']
  new_shared = cluster_designs[cluster]['shared']
  new_archived = cluster_designs[cluster]['archived']
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, 
    "includes": new_includes,"description":new_description,"contact":new_contact,"alt_title":new_alt_title,"shared":new_shared,"archived":new_archived}
  cluster_designs.merge!({cluster => new_design})
  nutella.app.net.publish_to_all_runs('activity_update', {'cluster': cluster, 'activities': new_activities})
  return 'success'
end)


nutella.app.net.handle_requests_on_all_runs('set_cluster_portals', lambda do |message, run_id, from|
  app_log['data'] = app_log['data'].push(Time.now.strftime('%Y-%m-%d %T') + " | " + run_id + " | " + "PORTAL UPDATE")

  # puts message
  cluster = message['cluster']
  new_portals = message['cluster_portals']
  new_activities = cluster_designs[cluster]['activities']
  new_distribution = cluster_designs[cluster]['distribution']
  new_cluster_resources = cluster_designs[cluster]['cluster_resources']
  new_includes = cluster_designs[cluster]['includes']
  new_description = cluster_designs[cluster]['description']
  new_pw = cluster_designs[cluster]['pw']
  new_contact = cluster_designs[cluster]['contact']
  new_alt_title = cluster_designs[cluster]['alt_title']
  new_shared = cluster_designs[cluster]['shared']
  new_archived = cluster_designs[cluster]['archived']
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, 
    "includes": new_includes,"description":new_description,"contact":new_contact,"alt_title":new_alt_title,"shared":new_shared,"archived":new_archived}
  cluster_designs.merge!({cluster => new_design})
  nutella.app.net.publish_to_all_runs('portal_update', {'cluster': cluster, 'portals': new_portals})
  return 'success'
end)



nutella.app.net.handle_requests_on_all_runs('set_cluster_distribution', lambda do |message, run_id, from|
  app_log['data'] = app_log['data'].push(Time.now.strftime('%Y-%m-%d %T') + " | " + run_id + " | " + "DISTRIBUTION UPDATE")
  cluster = message['cluster']
  new_portals = cluster_designs[cluster]['portals']
  new_activities = cluster_designs[cluster]['activities']
  new_distribution = message['cluster_distribution']
  new_cluster_resources = cluster_designs[cluster]['cluster_resources']
  new_includes = cluster_designs[cluster]['includes']
  new_description = cluster_designs[cluster]['description']
  new_pw = cluster_designs[cluster]['pw']
  new_contact = cluster_designs[cluster]['contact']
  new_alt_title = cluster_designs[cluster]['alt_title']
  new_shared = cluster_designs[cluster]['shared']
  new_archived = cluster_designs[cluster]['archived']
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, "includes": new_includes,"description": new_description,"contact": new_contact,"alt_title": new_alt_title,"shared": new_shared,"archived": new_archived}
  cluster_designs.merge!({cluster => new_design})
  nutella.app.net.publish_to_all_runs('distribution_update', {'cluster': cluster, 'distribution': new_distribution})
  return 'success'
end)

nutella.app.net.handle_requests_on_all_runs('set_cluster_info_pw', lambda do |message, run_id, from|
  # puts message
  cluster = message['cluster']
  new_portals = cluster_designs[cluster]['portals']
  new_activities = cluster_designs[cluster]['activities']
  new_distribution = cluster_designs[cluster]['distribution']
  new_cluster_resources = cluster_designs[cluster]['cluster_resources']
  new_includes = cluster_designs[cluster]['includes']
  new_description = message['description']
  new_pw = message['pw']
  new_contact = message['contact']
  new_alt_title = message['alt_title']
  new_shared = cluster_designs[cluster]['shared']
  new_archived = message['archived']
  new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "pw": new_pw, "cluster_resources": new_cluster_resources, "includes": new_includes,"description": new_description,"contact": new_contact,"alt_title": new_alt_title,"shared": new_shared,"archived": new_archived}
  cluster_designs.merge!({cluster => new_design})
  # nutella.app.net.publish_to_all_runs('description_update', {'cluster': cluster, 'description': new_description})
  return 'success'
end)


# nutella.app.net.subscribe_to_run('BZAEDS-6-AM','set_cluster_distribution', lambda do |message, from|
#   # puts message
#   cluster = message['cluster']
#   new_portals = cluster_designs[cluster]['portals']
#   new_activities = cluster_designs[cluster]['activities']
#   new_distribution = message['cluster_distribution']
#   new_cluster_resources = cluster_designs[cluster]['cluster_resources']
#   new_includes = cluster_designs[cluster]['includes']
#   new_design = {"activities": new_activities, "portals": new_portals, "distribution": new_distribution, "cluster_resources": new_cluster_resources, "includes": new_includes}
#   cluster_designs.merge!({cluster => new_design})
#   nutella.app.net.publish_to_run('BZAEDS-6-AM','distribution_update', {'cluster': cluster, 'distribution': new_distribution})
#   # return 'success'
# end)



# sections


# nutella.app.net.handle_requests_on_all_runs('get_runs', lambda do |cluster, run_id, from|
#   unix = 'cd ../..; nutella runs | grep "' + cluster + '"'
#   response = `#{unix}`
#   puts response
#   puts response.length
#   return response
# end)

nutella.app.net.handle_requests_on_all_runs('is_enactment_running', lambda do |enactment, run_id, from|
  unix = 'cd ../..; nutella runs | grep "' + enactment + '"'
  result = `#{unix}`
  if result.include? enactment
   return 'true'
  else
  return 'false'
  end
end)


# nutella.app.net.handle_requests_on_run('AD-MIN-0','app_interfaces', lambda do |enactment, run_id, from|
#   unix = 'cd ../../interfaces; ls'
#   result = `#{unix}`
#   puts result
# end)



nutella.app.net.listen



