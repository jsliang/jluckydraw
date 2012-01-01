
function TrimString(sInString) {
    sInString = sInString.replace( /^\s+/g, "" );// strip leading
    return sInString.replace( /\s+$/g, "" );// strip trailing
}

function parseList(textarea) {
    var list_str = $(textarea).val();
    var names = new Array();

    var list_lines = list_str.split("\n");
    for (var i = 0; i < list_lines.length; i++) {
        var name = TrimString(list_lines[i]);
        if (name != "") names.push(name);
    }
    
    return names;
}

$(document).ready(function() {
    var t;
    
    function startRolling() {
        var names = $("#name_list").data('names');
        var start_idx = $("#name_list").data('start_idx');
        
        var idx_1 = start_idx % names.length;
        var idx_2 = (start_idx + 1) % names.length;
        var idx_3 = (start_idx + 2) % names.length;
        var idx_4 = (start_idx + 3) % names.length;
        var idx_5 = (start_idx + 4) % names.length;
        $("#draw-1 .text").text(names[idx_1]);
        $("#draw-2 .text").text(names[idx_2]);
        $("#draw-3 .text").text(names[idx_3]);
        $("#draw-4 .text").text(names[idx_4]);
        $("#draw-5 .text").text(names[idx_5]);
        
        $("#name_list").data('start_idx', idx_2);
    }
    
    $("#switch").button();
    $("#switch").data("status", "stopped");
    $("#switch").data("origin_text", $("#switch").text());
    $("#switch").click(function(){
        if ($("#switch").data("status") == "stopped") {
            $("#switch").data("status", "rolling");
            
            $("#switch").text("停～！");
            
            names = parseList("#name_list");
            $("#name_list").data('names', names);
            $("#name_list").data('start_idx', 0);
            
            intervalID = setInterval(startRolling, 50);
        } else {
            clearInterval(intervalID);
            $("#switch").data("status", "stopped");
            $("#switch").text($("#switch").data("origin_text"));
        }
    });
});
