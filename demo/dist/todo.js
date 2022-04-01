<<<<<<< HEAD
(()=>{var t={515:t=>{"use strict";t.exports=JSON.parse('{"concept":[{"id":"11g5bwb5-451d-344f-80d0-1e2138a59ec9","name":"todolist","nature":"concrete","attributes":[{"name":"title","target":{"name":"string","constraint":{"length":{"type":"range","range":{"min":{"value":1},"max":{"value":50}}}}},"unique":true,"required":true},{"name":"tags","target":{"name":"set","accept":{"name":"tag"}},"required":true},{"name":"tasks","target":{"name":"set","accept":{"name":"task","default":"single-task"},"constraint":{"cardinality":{"type":"range","range":{"min":{"value":1}}}}},"required":true}]},{"id":"01f6fc23-pdab-4e74-b9cd-51afb30ecfc5","name":"tag","nature":"concrete","attributes":[{"name":"name","target":{"name":"tag-name"},"required":true},{"name":"priority","target":{"name":"priority"},"required":true}]},{"id":"adefde42-abd9-o57f-8e84-ae1f056d26f7","name":"task","description":null,"nature":"prototype","attributes":[{"name":"name","target":{"name":"string","constraint":{"length":{"type":"range","range":{"min":{"value":2}}}}},"required":true},{"name":"description","target":{"name":"string","constraint":{"length":{"type":"range","range":{"min":{"value":2}}}}},"required":true},{"name":"completed","target":{"name":"boolean","default":false},"required":true},{"name":"tags","target":{"name":"set","accept":{"name":"reference","accept":{"name":"tag"}}},"required":true},{"name":"priority","target":{"name":"priority"},"required":false},{"name":"due_date","target":{"name":"date"},"required":false}]},{"id":"g52dedae-ca1d-24f5-8e84-d2a1f0e566f7","name":"single-task","nature":"concrete","prototype":"task","attributes":[]},{"id":"ddeqd2e4-4da1-7of4-82e9-a1hf06d2e6f7","name":"recurring-task","nature":"concrete","prototype":"task","attributes":[{"name":"start","target":{"name":"date"},"required":true},{"name":"end","target":{"name":"date"},"required":true},{"name":"recurrence","target":{"name":"number","constraint":{"value":{"type":"range","range":{"min":{"value":1},"max":{"value":7}}}}},"required":true}]},{"id":"p3a693c6-6e13-4e2f-b39f-26707210ab66","name":"priority","nature":"derivative","base":"string","constraint":{"values":["P1","P2","P3","P4"]}},{"name":"tag-name","nature":"derivative","base":"string","constraint":{"length":{"type":"range","range":{"min":{"value":1},"max":{"value":20}}},"value":{"type":"pattern","pattern":{"insensitive":true,"global":true,"value":"^\\\\w+(-\\\\w+)*$"}}}},{"id":"c6pa3963-713e-2e2f-9fb3-263707d2b6p6","name":"date","nature":"derivative","base":"string","constraint":{"value":{"type":"pattern","pattern":{"insensitive":true,"global":true,"value":"^([12]\\\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\\\d|3[01]))$"}}}}]}')},280:t=>{"use strict";t.exports=JSON.parse('{"name":"Todo","concepts":[{"name":"todolist"},{"name":"single-task"},{"name":"recurring-task"}]}')},478:t=>{"use strict";t.exports=JSON.parse('{"projection":[{"type":"style","name":"box-left","style":{"box":{"outer":{"left":{"value":6,"unit":"px"}}}}},{"type":"style","name":"box-top","style":{"box":{"outer":{"top":{"value":6,"unit":"px"}}}}},{"type":"style","name":"box-right","style":{"box":{"outer":{"right":{"value":6,"unit":"px"}}}}},{"type":"style","name":"box-bottom","style":{"box":{"outer":{"bottom":{"value":6,"unit":"px"}}}}},{"concept":{"name":"todolist"},"type":"layout","tags":[],"content":{"type":"flex","orientation":"column","wrappable":false,"disposition":[{"type":"layout","layout":{"type":"flex","orientation":"row","alignItems":"center","disposition":[{"type":"static","static":{"type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_bullets_checkbox.png","style":{"css":["td-todo-icon"]}}},{"type":"attribute","name":"title","style":{"css":["td-todo-title"]}}],"style":{"css":["td-todo-header"]}}},{"type":"layout","layout":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"tasks","tag":"tasks","style":{"css":["td-tasks"]}},{"type":"attribute","name":"tags","tag":"tags","style":{"css":["td-tags"]}}],"style":{"css":["td-todo-body"]}}}],"style":{"css":["td-todo"]}}},{"concept":{"name":"tag"},"type":"layout","tags":[],"content":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"name","required":true,"style":{"css":["td-tag-name"]}},{"type":"attribute","name":"priority","required":true,"tag":"choice","style":{"css":["td-tag-priority"]}}],"style":{"css":["td-tag"]}}},{"concept":{"name":"tag"},"type":"layout","tags":["refchoice"],"content":{"type":"flex","disposition":[{"type":"attribute","name":"name","tag":"readonly","required":true}]}},{"concept":{"name":"task"},"tags":["list-item"],"type":"layout","projection":{"type":"flex","orientation":"column","disposition":[{"type":"layout","layout":{"type":"flex","orientation":"row","justifyContent":"center","disposition":[{"type":"field","field":{"type":"choice","choice":{"option":{"template":{"tag":"choice"},"style":{"css":["selector-choice__option"]}},"style":{"css":["selector-choice__options"]}},"expanded":true,"input":false,"style":{"css":["selector-choice","selector-choice--task"]}}},{"type":"static","static":{"type":"button","trigger":"open-option","bind":"value","content":[{"type":"static","static":{"type":"text","content":{"type":"html","html":"&hellip;"},"style":{"css":["td-task__btn-option-content"]}}},{"type":"static","static":{"type":"text","content":"Options","style":{"css":["td-task__btn-option-tooltip"]}}}],"style":{"css":["td-task__btn-option"]}}}],"style":{"ref":["box-bottom"]}}},{"type":"projection","bind":"value","placeholder":false,"required":true,"tag":"choice-selection"}],"style":{"css":["td-task"]}}},{"concept":{"name":"single-task"},"type":"layout","tags":["choice-selection"],"projection":{"type":"flex","orientation":"row","alignItems":"start","disposition":[{"type":"attribute","name":"completed","tag":"check-field"},{"type":"layout","layout":{"type":"flex","orientation":"column","disposition":[{"type":"attribute","name":"name","tag":"simple-string"},{"type":"attribute","name":"description","tag":"textarea","style":{"ref":["box-top"]}}],"style":{"css":["td-task-header"]}}}],"style":{"css":["td-single-task"]}}},{"concept":{"name":"single-task"},"type":"layout","tags":["choice"],"projection":{"type":"flex","orientation":"row","focusable":false,"help":"Single task","disposition":[{"type":"static","static":{"type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_dot.png","style":{"css":["task-choice-icon"]}}},{"type":"static","static":{"type":"text","content":"Single task","style":{"css":["task-choice-tooltip"]}}}],"style":{"css":["task-choice"]}}},{"concept":{"name":"recurring-task"},"type":"layout","tags":["choice-selection"],"projection":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"completed","tag":"check-field"},{"type":"layout","layout":{"type":"flex","orientation":"column","disposition":[{"type":"attribute","name":"name","tag":"simple-string"},{"type":"attribute","name":"description","tag":"textarea","style":{"ref":["box-top"]}},{"type":"static","static":{"type":"text","content":"Period","style":{"ref":["box-top"],"css":["title","period-title"]}}},{"type":"layout","layout":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"start","tag":"date"},{"type":"static","static":{"type":"text","content":{"type":"html","html":"&ndash;"},"style":{"ref":["box-left","box-right"]}}},{"type":"attribute","name":"end","tag":"date"}],"style":{"css":["td-task-period"]}}},{"type":"attribute","name":"recurrence","tag":"label-number","style":{"css":["td-task-recurrence"]}}],"style":{"css":["td-task-header"]}}}],"style":{"css":["td-recurring-task"]}}},{"concept":{"name":"recurring-task"},"type":"layout","tags":["choice"],"projection":{"type":"flex","orientation":"row","focusable":false,"help":"Recurring task","disposition":[{"type":"static","static":{"type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_recurring.png","style":{"css":["task-choice-icon"]}}},{"type":"static","static":{"type":"text","content":"Recurring task","style":{"css":["task-choice-tooltip"]}}}],"style":{"css":["task-choice"]}}},{"concept":{"prototype":"task"},"type":"layout","tags":["option"],"projection":{"type":"flex","orientation":"column","disposition":[{"type":"static","static":{"type":"text","content":"Options","style":{"css":["title","period-title"],"text":{"transform":"uppercase"}}}},{"type":"layout","layout":{"type":"flex","orientation":"row","disposition":[{"type":"static","static":{"type":"text","content":"Task: ","style":{"text":{"bold":500}}}},{"type":"attribute","name":"name","tag":"readonly","required":true,"style":{"box":{"outer":{"left":{"value":2,"unit":"px"}}}}}],"style":{"ref":["box-bottom"],"text":{"color":{"type":"hex","value":"#696969"}}}}},{"type":"attribute","name":"priority","tag":"label-string","required":true},{"type":"attribute","name":"due_date","tag":"label-date","required":true},{"type":"attribute","name":"tags","tag":"tags"}],"style":{"css":["td-task-option"]}}},{"concept":{"prototype":"task"},"type":"layout","tags":["refchoice"],"projection":{"type":"flex","orientation":"row","alignItems":"center","disposition":[{"type":"attribute","name":"name","tag":"readonly","required":true}],"style":{"css":["task-refchoice"]}}},{"concept":{"name":"boolean"},"tags":["check-field"],"type":"field","content":{"type":"binary","checkbox":{"label":{"content":[],"style":{"css":["check-field__label"]}},"style":{"css":["check-field__checkbox"]}},"style":{"css":["check-field"]}}},{"concept":{"name":"set"},"type":"layout","tags":["tags"],"projection":{"type":"flex","orientation":"column","disposition":[{"type":"layout","layout":{"type":"flex","orientation":"row","disposition":[{"type":"static","static":{"type":"text","content":"Tags","style":{"css":["td-tag-set-title"]}}},{"type":"static","static":{"type":"button","action":{"type":"add","value":null},"content":[{"type":"static","static":{"type":"text","content":"+","style":{"css":["td-tag-set-header__button-content"]}}}],"style":{"css":["td-tag-set-header__button"]}}}],"style":{"css":["td-tag-set-header"]}}},{"type":"field","field":{"type":"list","readonly":false,"disabled":false,"list":{"item":{"template":{"tag":"","name":""},"style":{"css":["td-tag-set__list-item"]}},"style":{"css":["td-tag-set__list"]}},"action":{"add":false},"style":{"css":["td-tag-set-body"]}}}],"style":{"css":["td-tag-set"]}}},{"concept":{"name":"set"},"type":"field","tags":["tasks"],"projection":{"type":"list","list":{"item":{"template":{"tag":"","name":""},"style":{"css":["td-task-set__list-item"]}},"style":{"css":["td-task-set__list"]}},"action":{"add":{"position":"after","help":"Add a task","content":[{"type":"static","static":{"type":"text","content":"+","style":{"css":["td-task-set__button-icon"]}}},{"type":"static","static":{"type":"text","content":"Add task","style":{"css":["td-task-set__button-content"]}}}],"style":{"css":["td-task-set__button"]}}},"style":{"css":["td-task-set"]}}},{"concept":{"name":"string"},"tags":["simple-string"],"type":"field","content":{"type":"text","resizable":true,"input":{"placeholder":{"type":"property","name":"refname"},"style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox"]}}},{"concept":{"name":"string"},"tags":["label-string"],"type":"layout","content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"refname"},"style":{"css":["label","td-groupfield-label"]}}},{"type":"field","field":{"type":"text","resizable":true,"input":{"placeholder":"null","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-groupfield__textbox"]}}}],"style":{"css":["td-groupfield"]}}},{"concept":{"name":"string"},"type":"field","tags":["textarea"],"content":{"type":"text","multiline":true,"input":{"type":"text","placeholder":"Enter a description","style":{"css":["td-textarea__input"]}},"style":{"css":["td-textarea"]}}},{"concept":{"name":"string"},"type":"layout","tags":["readonly"],"content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"value","style":{"css":["td-name-reference__value"]}}}}],"style":{"css":["td-name-reference"]}}},{"concept":{"name":"date"},"type":"field","tags":["date"],"content":{"type":"text","input":{"type":"date","placeholder":"YYYY-MM-DD","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-textbox--date"]}}},{"concept":{"name":"date"},"tags":["label-date"],"type":"layout","content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"refname"},"style":{"css":["label","td-groupfield-label"]}}},{"type":"field","field":{"type":"text","input":{"type":"date","placeholder":"YYYY-MM-DD","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-textbox--date","td-groupfield__textbox"]}}}],"style":{"css":["td-groupfield"]}}},{"concept":{"name":"priority"},"type":"field","tags":["choice"],"content":{"type":"choice","choice":{"option":{"template":{"tag":""},"style":{"css":["priority-select__choice-option"]}},"style":{"css":["priority-select__choice"]}},"placeholder":"P0","expanded":false,"input":false,"style":{"css":["priority-select"]}}},{"concept":{"name":"number"},"tags":["textual"],"type":"field","content":{"type":"text","resizable":true,"input":{"placeholder":"time","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox"]}}},{"concept":{"name":"number"},"type":"field","tags":["floating-label"],"content":{"type":"text","container":{"type":"flex","orientation":"row","content":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"label"},"style":{"css":["td-label"]}}},{"type":"input","input":{"type":"text","placeholder":{"type":"property","name":"label"},"style":{"css":["td-textbox__input"]}}}],"style":{"css":["td-textbox","td-textbox--float"]}}}},{"concept":{"name":"number"},"tags":["label-number"],"type":"layout","content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"refname"},"style":{"css":["label","td-groupfield-label"]}}},{"type":"field","field":{"type":"text","input":{"type":"number","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-groupfield__textbox"]}}}],"style":{"css":["td-groupfield"]}}},{"concept":{"name":"reference"},"type":"field","tags":["tag-reference"],"content":{"type":"choice","choice":{"option":{"template":{"tag":"refchoice"},"style":{"css":["tag-reference__choice-option"]}},"style":{"css":["tag-reference__choice"]}},"placeholder":"select tag","expanded":false,"input":{"placeholder":"Search..."},"style":{"css":["tag-reference"]}}}]}')}},e={};function a(s){if(e[s])return e[s].exports;var n=e[s]={exports:{}};return t[s](n,n.exports,a),n.exports}(()=>{const t=a(280),e=a(515),s=a(478),n={"open-option":function(t){let e=t[0],a=this.createProjection(e,"option"),s=this.findWindow("side-instance");s||(s=this.createWindow("side-instance"),s.container.classList.add("td-option-sideview")),s.instances.size>0&&Array.from(s.instances)[0].delete();let n=this.createInstance(e,a,{type:"projection",close:"DELETE-PROJECTION"});s.addInstance(n)}};Gentleman.activateEditor(".app-editor")[0].init({config:t,conceptModel:e,projectionModel:s,handlers:n})})()})();
=======
(()=>{var t={515:t=>{"use strict";t.exports=JSON.parse('{"type":"concept","concept":[{"id":"11g5bwb5-451d-344f-80d0-1e2138a59ec9","name":"todolist","nature":"concrete","root":true,"attributes":[{"name":"title","target":{"name":"string","constraint":{"length":{"type":"range","range":{"min":{"value":1},"max":{"value":50}}}}},"unique":true,"required":true},{"name":"tags","target":{"name":"set","accept":{"name":"tag"}},"required":true},{"name":"tasks","target":{"name":"set","accept":{"name":"task","default":"single-task"},"constraint":{"cardinality":{"type":"range","range":{"min":{"value":1}}}}},"required":true}]},{"id":"01f6fc23-pdab-4e74-b9cd-51afb30ecfc5","name":"tag","nature":"concrete","attributes":[{"name":"name","target":{"name":"tag-name"},"required":true},{"name":"priority","target":{"name":"priority"},"required":true}]},{"id":"adefde42-abd9-o57f-8e84-ae1f056d26f7","name":"task","description":null,"nature":"prototype","attributes":[{"name":"name","target":{"name":"string","constraint":{"length":{"type":"range","range":{"min":{"value":2}}}}},"required":true},{"name":"description","target":{"name":"string","constraint":{"length":{"type":"range","range":{"min":{"value":2}}}}},"required":true},{"name":"completed","target":{"name":"boolean","default":false},"required":true},{"name":"tags","target":{"name":"set","accept":{"name":"reference","accept":{"name":"tag"}}},"required":true},{"name":"priority","target":{"name":"priority"},"required":false},{"name":"due_date","target":{"name":"date"},"required":false}]},{"id":"g52dedae-ca1d-24f5-8e84-d2a1f0e566f7","name":"single-task","nature":"concrete","prototype":"task","root":false,"attributes":[]},{"id":"ddeqd2e4-4da1-7of4-82e9-a1hf06d2e6f7","name":"recurring-task","nature":"concrete","prototype":"task","root":false,"attributes":[{"name":"start","target":{"name":"date"},"required":true},{"name":"end","target":{"name":"date"},"required":true},{"name":"recurrence","target":{"name":"number","constraint":{"value":{"type":"range","range":{"min":{"value":1},"max":{"value":7}}}}},"required":true}]},{"id":"p3a693c6-6e13-4e2f-b39f-26707210ab66","name":"priority","nature":"derivative","base":"string","constraint":{"values":["P1","P2","P3","P4"]},"attributes":[]},{"name":"tag-name","nature":"derivative","base":"string","constraint":{"length":{"type":"range","range":{"min":{"value":1},"max":{"value":20}}},"value":{"type":"pattern","pattern":{"insensitive":true,"global":true,"value":"^\\\\w+(-\\\\w+)*$"}}},"attributes":[]},{"id":"c6pa3963-713e-2e2f-9fb3-263707d2b6p6","name":"date","nature":"derivative","base":"string","constraint":{"value":{"type":"pattern","pattern":{"insensitive":true,"global":true,"value":"^([12]\\\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\\\d|3[01]))$"}}},"attributes":[]}]}')},280:t=>{"use strict";t.exports=JSON.parse('{"toolbar":[{"type":"button","name":"button-export","action":"export.model","class":["btn","editor-toolbar__button","editor-toolbar__button--save"]},{"type":"button","name":"button-menu","action":"open.menu","class":["btn","editor-toolbar__button","editor-toolbar__button--home"]}]}')},478:t=>{"use strict";t.exports=JSON.parse('{"type":"projection","projection":[{"concept":{"name":"todolist"},"type":"layout","tags":["todo-tasks"],"content":{"type":"flex","orientation":"column","wrappable":false,"disposition":[{"type":"container","content":[{"type":"attribute","name":"title","style":{"css":["td-todo-title"]}}],"style":{"css":["td-todo-header"]},"layout":{"type":"flex","orientation":"row","alignItems":"center"}},{"type":"container","content":[{"kind":"static","type":"plink","tag":"todo-tasks","content":[{"kind":"static","type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_bullets_checkbox.png","style":{"css":["td-todo-icon"]}},{"kind":"static","type":"text","content":"Tasks","style":{"css":["td-todo-text"]}}],"style":{"css":["td-todo-nav-link","current"]}},{"kind":"static","type":"plink","tag":"todo-labels","content":[{"kind":"static","type":"image","url":"https://static.thenounproject.com/png/47018-200.png","style":{"css":["td-todo-icon"]}},{"kind":"static","type":"text","content":"Labels","style":{"css":["td-todo-text"]}}],"style":{"css":["td-todo-nav-link"]}}],"style":{"css":["td-todo-nav"]},"layout":{"type":"flex","orientation":"row"}},{"type":"layout","layout":{"type":"flex","orientation":"column","disposition":[{"type":"attribute","name":"tasks","tag":"tasks","style":{"css":["td-tasks"]}}],"style":{"css":["td-todo-body"]}}}],"style":{"css":["td-todo"]}}},{"concept":{"name":"todolist"},"type":"layout","tags":["todo-labels"],"content":{"type":"flex","orientation":"column","wrappable":false,"disposition":[{"type":"container","content":[{"type":"attribute","name":"title","style":{"css":["td-todo-title"]}}],"style":{"css":["td-todo-header"]},"layout":{"type":"flex","orientation":"row","alignItems":"center"}},{"type":"container","content":[{"kind":"static","type":"plink","tag":"todo-tasks","content":[{"kind":"static","type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_bullets_checkbox.png","style":{"css":["td-todo-icon"]}},{"kind":"static","type":"text","content":"Tasks","style":{"css":["td-todo-text"]}}],"style":{"css":["td-todo-nav-link"]}},{"kind":"static","type":"plink","tag":"todo-labels","content":[{"kind":"static","type":"image","url":"https://static.thenounproject.com/png/47018-200.png","style":{"css":["td-todo-icon"]}},{"kind":"static","type":"text","content":"Labels","style":{"css":["td-todo-text"]}}],"style":{"css":["td-todo-nav-link","current"]}}],"layout":{"type":"flex","orientation":"row"}},{"type":"layout","layout":{"type":"flex","orientation":"column","disposition":[{"type":"attribute","name":"tags","tag":"tags","style":{"css":["td-tags"]}}],"style":{"css":["td-todo-body"]}}}],"style":{"css":["td-todo"]}}},{"concept":{"name":"tag"},"type":"layout","tags":[],"content":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"name","required":true,"style":{"css":["td-tag-name"]}},{"type":"attribute","name":"priority","required":true,"tag":"choice","style":{"css":["td-tag-priority"]}}],"style":{"css":["td-tag"]}}},{"concept":{"name":"tag"},"type":"layout","tags":["refchoice"],"content":{"type":"flex","disposition":[{"type":"attribute","name":"name","tag":"readonly","required":true}]}},{"concept":{"name":"task"},"tags":["list-item"],"type":"layout","projection":{"type":"flex","orientation":"column","disposition":[{"type":"layout","layout":{"type":"flex","orientation":"row","justifyContent":"center","disposition":[{"type":"field","field":{"type":"choice","choice":{"option":{"template":{"tag":"choice"},"style":{"css":["selector-choice__option"]}},"style":{"css":["selector-choice__options"]}},"expanded":true,"input":false,"style":{"css":["selector-choice","selector-choice--task"]}}},{"type":"static","static":{"type":"button","trigger":"open-option","bind":"value","content":[{"type":"static","static":{"type":"text","content":{"type":"html","html":"&hellip;"},"style":{"css":["td-task__btn-option-content"]}}},{"type":"static","static":{"type":"text","content":"Options","style":{"css":["td-task__btn-option-tooltip"]}}}],"style":{"css":["td-task__btn-option"]}}}],"style":{"ref":["box-bottom"]}}},{"type":"projection","bind":"value","placeholder":false,"required":true,"tag":"choice-selection"}],"style":{"css":["td-task"]}}},{"concept":{"name":"single-task"},"type":"layout","tags":["choice-selection"],"projection":{"type":"flex","orientation":"row","alignItems":"start","disposition":[{"type":"attribute","name":"completed","tag":"check-field"},{"type":"layout","layout":{"type":"flex","orientation":"column","disposition":[{"type":"attribute","name":"name","tag":"simple-string"},{"type":"attribute","name":"description","tag":"textarea","style":{"ref":["box-top"]}}],"style":{"css":["td-task-header"]}}}],"style":{"css":["td-single-task"]}}},{"concept":{"name":"single-task"},"type":"layout","tags":["choice"],"projection":{"type":"flex","orientation":"row","focusable":false,"help":"Single task","disposition":[{"type":"static","static":{"type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_dot.png","style":{"css":["task-choice-icon"]}}},{"type":"static","static":{"type":"text","content":"Single task","style":{"css":["task-choice-tooltip"]}}}],"style":{"css":["task-choice"]}}},{"concept":{"name":"recurring-task"},"type":"layout","tags":["choice-selection"],"projection":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"completed","tag":"check-field"},{"type":"layout","layout":{"type":"flex","orientation":"column","disposition":[{"type":"attribute","name":"name","tag":"simple-string"},{"type":"attribute","name":"description","tag":"textarea","style":{"ref":["box-top"]}},{"type":"static","static":{"type":"text","content":"Period","style":{"ref":["box-top"],"css":["title","period-title"]}}},{"type":"layout","layout":{"type":"flex","orientation":"row","disposition":[{"type":"attribute","name":"start","tag":"date"},{"type":"static","static":{"type":"text","content":{"type":"html","html":"&ndash;"},"style":{"ref":["box-left","box-right"]}}},{"type":"attribute","name":"end","tag":"date"}],"style":{"css":["td-task-period"]}}},{"type":"attribute","name":"recurrence","tag":"label-number","style":{"css":["td-task-recurrence"]}}],"style":{"css":["td-task-header"]}}}],"style":{"css":["td-recurring-task"]}}},{"concept":{"name":"recurring-task"},"type":"layout","tags":["choice"],"projection":{"type":"flex","orientation":"row","focusable":false,"help":"Recurring task","disposition":[{"type":"static","static":{"type":"image","url":"https://geodes-sms.github.io/gentleman/demo/todo/assets/icon_recurring.png","style":{"css":["task-choice-icon"]}}},{"type":"static","static":{"type":"text","content":"Recurring task","style":{"css":["task-choice-tooltip"]}}}],"style":{"css":["task-choice"]}}},{"concept":{"prototype":"task"},"type":"layout","tags":["option"],"projection":{"type":"flex","orientation":"column","disposition":[{"type":"static","static":{"type":"text","content":"Options","style":{"css":["title","period-title"],"text":{"transform":"uppercase"}}}},{"type":"layout","layout":{"type":"flex","orientation":"row","disposition":[{"type":"static","static":{"type":"text","content":"Task: ","style":{"text":{"bold":500}}}},{"type":"attribute","name":"name","tag":"readonly","required":true,"style":{"box":{"outer":{"left":{"value":2,"unit":"px"}}}}}],"style":{"ref":["box-bottom"],"text":{"color":{"type":"hex","value":"#696969"}}}}},{"type":"attribute","name":"priority","tag":"label-string","required":true},{"type":"attribute","name":"due_date","tag":"label-date","required":true},{"type":"attribute","name":"tags","tag":"tags"}],"style":{"css":["td-task-option"]}}},{"concept":{"prototype":"task"},"type":"layout","tags":["refchoice"],"projection":{"type":"flex","orientation":"row","alignItems":"center","disposition":[{"type":"attribute","name":"name","tag":"readonly","required":true}],"style":{"css":["task-refchoice"]}}},{"concept":{"name":"boolean"},"tags":["check-field"],"type":"field","content":{"type":"binary","checkbox":{"label":{"content":[],"style":{"css":["check-field__label"]}},"style":{"css":["check-field__checkbox"]}},"style":{"css":["check-field"]}}},{"concept":{"name":"set"},"type":"layout","tags":["tags"],"projection":{"type":"flex","orientation":"column","disposition":[{"kind":"static","type":"button","action":{"type":"add","value":null},"content":[{"kind":"static","type":"text","content":"+","style":{"css":["td-tag-set__button-icon"]}},{"kind":"static","type":"text","content":"Add label","style":{"css":["td-tag-set__button-content"]}}],"style":{"css":["td-tag-set__button"]}},{"type":"field","field":{"type":"list","readonly":false,"disabled":false,"list":{"item":{"template":{"tag":"","name":"","collapsible":false},"style":{"css":["td-tag-set__list-item"]}},"style":{"css":["td-tag-set__list"]}},"action":{"add":false},"style":{"css":["td-tag-set-body"]}}}],"style":{"css":["td-tag-set"]}}},{"concept":{"name":"set"},"type":"field","tags":["tasks"],"projection":{"type":"list","list":{"item":{"template":{"tag":"","name":""},"style":{"css":["td-task-set__list-item"]}},"style":{"css":["td-task-set__list"]}},"action":{"add":{"position":"after","help":"Add a task","content":[{"kind":"static","type":"text","content":"+","style":{"css":["td-task-set__button-icon"]}},{"kind":"static","type":"text","content":"Add task","style":{"css":["td-task-set__button-content"]}}],"style":{"css":["td-task-set__button"]}}},"style":{"css":["td-task-set"]}}},{"concept":{"name":"string"},"tags":["simple-string"],"type":"field","content":{"type":"text","resizable":true,"input":{"placeholder":{"type":"property","name":"refname"},"style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox"]}}},{"concept":{"name":"string"},"tags":["label-string"],"type":"layout","content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"refname"},"style":{"css":["label","td-groupfield-label"]}}},{"type":"field","field":{"type":"text","resizable":true,"input":{"placeholder":"null","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-groupfield__textbox"]}}}],"style":{"css":["td-groupfield"]}}},{"concept":{"name":"string"},"type":"field","tags":["textarea"],"content":{"type":"text","multiline":true,"input":{"type":"text","placeholder":"Enter a description","style":{"css":["td-textarea__input"]}},"style":{"css":["td-textarea"]}}},{"concept":{"name":"string"},"type":"layout","tags":["readonly"],"content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"value","style":{"css":["td-name-reference__value"]}}}}],"style":{"css":["td-name-reference"]}}},{"concept":{"name":"date"},"type":"field","tags":["date"],"content":{"type":"text","input":{"type":"date","placeholder":"YYYY-MM-DD","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-textbox--date"]}}},{"concept":{"name":"date"},"tags":["label-date"],"type":"layout","content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"refname"},"style":{"css":["label","td-groupfield-label"]}}},{"type":"field","field":{"type":"text","input":{"type":"date","placeholder":"YYYY-MM-DD","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-textbox--date","td-groupfield__textbox"]}}}],"style":{"css":["td-groupfield"]}}},{"concept":{"name":"priority"},"type":"field","tags":["choice"],"content":{"type":"choice","choice":{"option":{"template":{"tag":""},"style":{"css":["priority-select__choice-option"]}},"style":{"css":["priority-select__choice"]}},"placeholder":"P0","expanded":false,"input":false,"style":{"css":["priority-select"]}}},{"concept":{"name":"number"},"tags":["textual"],"type":"field","content":{"type":"text","resizable":true,"input":{"placeholder":"time","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox"]}}},{"concept":{"name":"number"},"type":"field","tags":["floating-label"],"content":{"type":"text","container":{"type":"flex","orientation":"row","content":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"label"},"style":{"css":["td-label"]}}},{"type":"input","input":{"type":"text","placeholder":{"type":"property","name":"label"},"style":{"css":["td-textbox__input"]}}}],"style":{"css":["td-textbox","td-textbox--float"]}}}},{"concept":{"name":"number"},"tags":["label-number"],"type":"layout","content":{"type":"wrap","disposition":[{"type":"static","static":{"type":"text","content":{"type":"property","name":"refname"},"style":{"css":["label","td-groupfield-label"]}}},{"type":"field","field":{"type":"text","input":{"type":"number","style":{"css":["td-textbox__input"]}},"style":{"css":["td-textbox","td-groupfield__textbox"]}}}],"style":{"css":["td-groupfield"]}}},{"concept":{"name":"reference"},"type":"field","tags":["tag-reference"],"content":{"type":"choice","choice":{"option":{"template":{"tag":"refchoice"},"style":{"css":["tag-reference__choice-option"]}},"style":{"css":["tag-reference__choice"]}},"placeholder":"select tag","expanded":false,"input":{"placeholder":"Search..."},"style":{"css":["tag-reference"]}}}],"style":[{"type":"style","name":"box-left","style":{"box":{"outer":{"left":{"value":6,"unit":"px"}}}}},{"type":"style","name":"box-top","style":{"box":{"outer":{"top":{"value":6,"unit":"px"}}}}},{"type":"style","name":"box-right","style":{"box":{"outer":{"right":{"value":6,"unit":"px"}}}}},{"type":"style","name":"box-bottom","style":{"box":{"outer":{"bottom":{"value":6,"unit":"px"}}}}}]}')}},e={};function s(a){if(e[a])return e[a].exports;var o=e[a]={exports:{}};return t[a](o,o.exports,s),o.exports}(()=>{const t=s(280),e=s(515),a=s(478),o={"open-option":function(t){let e=t[0],s=this.createProjection(e,"option"),a=this.findWindow("side-instance");a||(a=this.createWindow("side-instance"),a.container.classList.add("td-option-sideview")),a.instances.size>0&&Array.from(a.instances)[0].delete();let o=this.createInstance(e,s,{type:"projection",close:"DELETE-PROJECTION"});a.addInstance(o)}};Gentleman.activateEditor(".app-editor")[0].init({config:t,conceptModel:e,projectionModel:a,handlers:o})})()})();
>>>>>>> 4fa52361a28ed3a1b742c8a26a93a0bb513e021c
