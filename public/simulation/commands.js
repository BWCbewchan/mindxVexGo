(function(root){
 'use strict';
 const groups={
  drivetrain:['drive','drive_for','drive_until','turn','turn_for','turn_to_heading','turn_to_rotation','stop_driving','set_drive_velocity','set_turn_velocity','set_drive_timeout','set_drive_heading','set_drive_rotation'].map(t=>'go_drivetrain_'+t),
  control:['wait','repeat','forever','if_then','if_then_else','if_elseif_else','wait_until','repeat_until','while','break','stop_project'].map(t=>'go_control_'+t),
  sensing:['reset_timer','timer_value','drive_is_done','drive_is_moving','drive_heading','drive_rotation','bumper','gyro_heading','gyro_rotation','eye_set_light_on','eye_set_range','eye_set_light_power','eye_distance','eye_found_object','eye_detect','eye_hue','eye_brightness'].map(t=>'go_sensing_'+t),
  console:['print','clear_all_rows','next_row','set_print_color','set_print_precision'].map(t=>'go_looks_'+t),
  operators:['add','subtract','multiply','divide','random','greater_than','less_than','equal_to','and','or','not','round','function','remainder'].map(t=>'go_operator_'+t),
  variables:['variable','set_variable','change_variable','boolean_variable','set_boolean_variable','item_of_array','set_item_of_array','set_array_to','size_of_array','item_of_2d_array','set_item_of_2d_array','set_2d_array_to','length_of_2d_array'].map(t=>'go_variables_'+t),
  values:['logic_boolean','logic_compare','logic_operation','logic_negate','logic_null','logic_ternary','math_number','math_integer','math_whole_number','math_positive_number','math_positive_number_only','math_arithmetic','math_single','math_trig','math_constant','math_number_property','math_change','math_round','math_on_list','math_modulo','math_constrain','math_random_int','math_random_float','math_atan2','text'],
  structure:['go_events_when_started','procedures_definition','procedures_call','procedures_prototype','argument_reporter_boolean','argument_reporter_number','argument_reporter_string','data_2darrayrow','go_other_comment','comment_text'],
  interaction:['go_magnet_energize','vr_pen_move','vr_pen_color','vr_pen_width','vr_pen_clear','vr_position','vr_delivered']
 };
 const types=Object.values(groups).flat(),allowed=new Set(types);
 root.VRCommands=Object.freeze({groups,types,supports:type=>allowed.has(type)});
 root.installVRBlocks=function(B){
  const definitions=[
   {type:'vr_pen_move',message0:'bút ảo %1',args0:[{type:'field_dropdown',name:'STATE',options:[['hạ xuống','down'],['nhấc lên','up']]}],previousStatement:null,nextStatement:null,colour:290},
   {type:'vr_pen_color',message0:'màu bút ảo %1',args0:[{type:'field_dropdown',name:'COLOR',options:[['xanh dương','#3b69b1'],['đỏ','#df5361'],['xanh lá','#31965b'],['đen','#253741']]}],previousStatement:null,nextStatement:null,colour:290},
   {type:'vr_pen_width',message0:'độ rộng bút ảo %1 mm',args0:[{type:'input_value',name:'WIDTH',check:'Number'}],previousStatement:null,nextStatement:null,colour:290},
   {type:'vr_pen_clear',message0:'xóa nét bút ảo',previousStatement:null,nextStatement:null,colour:290},
   {type:'vr_position',message0:'vị trí %1 từ tâm sân (mm)',args0:[{type:'field_dropdown',name:'AXIS',options:[['X','x'],['Y','y']]}],output:'Number',colour:165},
   {type:'vr_delivered',message0:'số vật đã giao đúng vùng',output:'Number',colour:165}
  ];
  for(const def of definitions)B.Blocks[def.type]={init(){this.jsonInit(def);}};
 };
})(globalThis);
