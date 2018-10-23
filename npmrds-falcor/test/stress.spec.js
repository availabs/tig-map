
var falcorGraph = require('./graph');
var get = require('lodash.get');
var tmcs = ["120+04448", "120+05838","120-05837","120-17024","120+17025","120+05852","120P05860","120N05860","120+05892","120-12582","120-05851","120N17025","120P17025","120N05852","120P05852","120N15530","120P15530","120P27824","120-15529","120+17117","120+15530","120-17117","120P17117","120N17117","120P27820","120P27818","120-05852","120P28034","120+05860","120-05859","120P27816","120+05853","120P28036","120P05853","120N05853","120+05854","120-05853","120P05894","120N05894","120+05895","120P17023","120N17023","120-05894","120P05895","120N05895","120P05892","120N05892","120N25393","120N25396","120P25396","120P25393","120N05893","120P05893","120+05894","120-05893","120+05893","120-05892","120+05838","120-05837","120-05848","120+05849","120+05896","120-05895","120P05849","120N05849","120+05850","120-05849","120P05850","120N05850","120+05851","120-05850","120P17024","120P05851","120N05851","120N17024","120-17024","120+17025","120+05852","120P05860","120N05860","120+05861","120-05860","120+05892","120-12582","120-05851","120-12010","120+07909","120+24626","120-24625","120+24625","120-24624","120P24625","120N24625","120P25389","120N25389","120P07909","120N07909","120-07909","120+12011","120N24664","120P24664","120-08087","120+08086","120+24665","120-24664","120+07908","120-12011","120+24664","120-24621","120+24622","120+24619","120-24618","120-24619","120+24620","120+12010","120-12009","120+17023","120-17022","120P12010","120N12010","120-12010","120+07909","120+08083","120-08084","120+17024","120-17023","120-08085","120+08084","120+24659","120-24658","120+08085","120-08086","120+24626","120-24625","120P24658","120N24658","120P08086","120N08086","120-24659","120+24660","120-08087","120+08086"]
var largeTmcs = ["120+04448","120-04447","120+04391","120-04390","120+07098","120-07097","120+04824","120-04823","120-04226","120P26221","120N04823","120P04823","120P04227","120N04227","120+04227","120P26683","120+04228","120-04227","120-04822","120+04823","120N04821","120N04822","120P04822","120+04822","120P04821","120N04228","120P04228","120P04229","120N04229","120-04820","120+04821","120+04230","120-04229","120-04448","120+04449","120P04449","120N04449","120P04448","120N04448","120N16549","120P16549","120P28362","120P28352","120+07188","120-07187","120+07186","120-07185","120+07187","120-07186","120P07186","120N07186","120P07187","120N07187","120+04392","120P04391","120N04391","120-04391","120+04384","120-04383","120-04384","120+04385","120+07099","120P07098","120N07098","120N21666","120P21666","120-07098","120+06565","120-06564","120-05240","120+05241","120P29997","120N05240","120P30003","120P30001","120P29999","120P05240","120P29995","120-05239","120+05240","120+15661","120-15660","120P05239","120N05239","120-05238","120+05239","120-15661","120+15662","120+17939","120-17938","120-05268","120+05269","120N15662","120P15662","120P06612","120N06612","120N06611","120N05269","120P05269","120P06611","120+15663","120-15662","120N15663","120P16748","120N16748","120P15663","120+15664","120-15663","120-05269","120+05270","120+16749","120-16748","120P05270","120N05270","120+05271","120-05270","120N05271","120P18069","120N18069","120P05271","120+05081","120-05080","120-04916","120P04917","120N04917","120P05081","120P19071","120N19071","120N05081","120+04918","120-04917","120N04918","120P04918","120-04918","120+04919","120+05082","120-05081","120N05082","120-05082","120P05082","120+05083","120N05083","120P05083","120P04919","120N04919","120P06564","120N06564","120+06564","120-06563","120+05281","120-05280","120N05281","120P05281","120-05281","120+05282","120N06563","120P05310","120N05310","120P06563","120-05310","120+05311","120N05311","120P05311","120+05312","120-05311","120+05265","120P05282","120N05282","120P05283","120N05283","120P06305","120-05282","120+05283","120N06305","120+19089","120-19088","120-05264","120P05265","120+05266","120-05265","120P19089","120N19089","120N05265","120P17308","120N17308","120N05238","120P10475","120P05238","120-05237","120+05238","120+05267","120-05266","120P05267","120N05267","120P05266","120P05237","120P26851","120N05266","120P26861","120N05237","120P27099","120-05236","120+05237","120+05284","120-05283","120N05236","120P05236","120+05236","120-05235","120P05235","120P27085","120P05284","120N05235","120-19486","120+19487","120P05234","120+05234","120-05233","120P25817","120N05284","120+05235","120-05234","120+05285","120-05284","120N05234","120P05233","120P07811","120N07811","120N05233","120+05233","120-05232","120P05232","120N05232","120P17902","120N17902","120+17306","120-17305","120+05232","120-05231","120P05231","120N05231","120+06668","120-06667","120P06670","120P06667","120N06667","120P05312","120N05312","120+05313","120-05312","120N05313","120P05313","120P06310","120N06310","120-05313","120+05314","120P05314","120N05314","120+05315","120-05314","120P05315","120-05230","120P05230","120N05230","120+05230","120-05229","120P26773","120P27077","120N05315","120P26777","120P27091","120P26775","120P05229","120N05229","120P17304","120+05316","120-05315","120-17298","120-05227","120N17993","120P17993","120N05228","120P05228","120+05229","120-05228","120+05227","120-05226","120P05226","120N05226","120+19397","120-19396","120+05226","120-05225","120N16239","120P16239","120N18416","120P18416","120+05225","120-05224","120N05225","120P05225","120P06714","120N06714","120P05224","120N05224","120P05220","120N05220","120+05224","120-05223","120N05223","120P05223","120-05222","120+05223","120P05222","120N05222","120P05221","120N05221","120+05221","120-05220","120+05220","120-05219","120P05219","120N05219","120+05366","120-05365","120P05365","120N05365","120P05366","120N05366","120+05367","120+05219","120-05218","120N05218","120N18055","120P18055","120N18572","120P18572","120P05218","120-05217","120+05218","120P05217","120N05217","120N18236","120P18236","120-05216","120-05215","120-05366","120N05215","120N05216","120N05367","120P05215","120P05367","120P05216","120P28140","120+05217","120P28142","120P25905","120P27089","120-05374","120+05375","120N18571","120P18571","120P05375","120N05375","120+05376","120-05375","120N05376","120P05376","120+05377","120-05376","120P06587","120P10248","120P05377","120N06587","120N10248","120N05377","120P13658","120+05146","120N13658","120-13658","120P05146","120N05146","120-05146","120+05147","120P05147","120N05147","120+06327","120-05364","120+05365","120-18686","120+18687","120+05364","120+19134","120-19133","120+15776","120P18253","120N18253","120P15776","120N15776","120+06695","120-06694","120-06693","120+06694","120+05363","120P18254","120N18254","120+05362","120-05361","120+06334","120+05361","120P17122","120N17122","120-05360","120P06693","120+05148","120-05147","120P05150","120N05150","120+05150","120-05149","120N06693","120N05360","120N10909","120+05360","120N17708","120+05359","120P05358","120P06692","120P05151","120-05150","120N05151","120N06340","120P06339","120+05152","120-05151","120P05152","120N05152","120-05152","120+05153","120+05149","120P05148","120N05148","120-05148","120P05149","120N05149","120+06692","120+05358","120+06691","120N06341","120N05357","120+18539","120-18538","120N06342","120+05357","120-05356","120N05153","120P05153","120-05153","120+05154","120N05154","120P05154","120P05155","120N05155","120-05155","120P05156","120N05156","120+05157","120-05156","120+05158","120-05157","120P05158","120N05158","120+05159","120P05159","120N05159","120+05160","120-05159","120+05161","120+05162","120P17938","120N17938","120P05268","120N05268","120+05268","120-05267","120-05271","120+05272","120P05272","120N05272","120+05273","120-05272","120P06607","120P05285","120N05285","120N06607","120+06659","120-06658","120+05286","120-05285","120P05286","120N05286","120+05287","120-05286","120-05088","120+05089","120P05287","120N05287","120N18005","120P18005","120P05273","120N05273","120+05274","120-05273","120+05084","120-05083","120P05084","120N05084","120+05085","120-05084","120P05274","120N05274","120P26785","120N05085","120P05085","120P26859","120+05275","120P26869","120-05274","120P26253","120-19360","120+05086","120-05085","120-04919","120+04920","120-04920","120+04921","120-06429","120P26259","120N04921","120P26855","120N05275","120P04921","120P05275","120+05276","120-05275","120+04922","120-04921","120+05277","120-05276","120P06429","120N06429","120P05086","120N05086","120P16850","120-05086","120+05087","120+04923","120-04922","120N05087","120P04922","120N04922","120P05087","120-05087","120N04923","120+05088","120+04924","120-04923","120P04923","120P05088","120N05088","120N04924","120P04924","120-04924","120+04925","120N04925","120P04925","120P05316","120N05316","120N06601","120-05316","120P05317","120N05317","120+05318","120-05317","120N05318","120+05319","120-05318","120N05319","120P05319","120+05320","120-05319","120P05320","120N05320","120P05090","120-05287","120P27209","120P26793","120P27225","120N05089","120N05288","120P26795","120P05288","120P27227","120P05089","120-05089","120+05090","120N05090","120+05091","120-05090","120-05320","120+05321","120P05321","120N05321","120P18851","120N18851","120P26769","120-05321","120+05322","120P26803","120P26771","120P26805","120P05091","120N05091","120P16280","120-16280","120P26783","120N06421","120N28012","120P28012","120-05091","120-28012","120+10921","120-07889","120+28013","120P07889","120N07889","120P28013","120N28013","120+05092","120-28013","120P05092","120N05092","120-05092","120+05093","120N05093","120P05093","120P26257","120-05093","120+05094","120-04925","120+04926","120P04926","120N04926","120+04927","120-04926","120N05094","120P05094","120-04927","120+04928","120-05094","120+05095","120N05095","120N04928","120P05095","120P04928","120+16844","120-19510","120-05095","120+05096","120N04929","120P04929","120+04930","120N05096","120P05096","120-04929","120P04930","120-05097","120+05098","120-05096","120+05097","120N04930","120+04931","120N05097","120P05097","120N18794","120P18794","120N04931","120P04931","120-04930","120-05377","120+05378","120N05378","120P05378","120+05379","120-05378","120+16092","120+05381","120-05380","120N05379","120P05379","120-06403","120+05380","120-05379","120P06404","120P16091","120-06404","120N16091","120P05380","120N05380","120-16091","120P16092","120N06722","120P06722","120P05381","120N05381","120+05382","120-05381","120N05382","120P05382","120P19519","120N19519","120-05382","120+05383","120P26029","120N05180","120P27115","120P05383","120P27119","120P26037","120P27117","120N05383","120P05180","120P26031","120P26027","120P25903","120N05098","120N18646","120P18646","120P05098","120-05098","120+05099","120+18648","120-18647","120-05178","120+05179","120-04931","120+04933","120P04932","120N04933","120N04932","120P04933","120-04932","120-04933","120P18648","120N18648","120N18583","120P18583","120-05179","120+05180","120N05179","120P05179","120N04934","120+05384","120-05383","120-04934","120+04935","120-04935","120+04936","120P04934","120-04928","120-05181","120-06398","120-06397","120+15507","120-05106","120P28172","120N05182","120P05182","120P28168","120-05182","120+05183","120P28164","120P05107","120N05107","120+05108","120-05107","120N05181","120P19518","120-05180","120+05181","120N19518","120P05181","120P19138","120N19138","120+05182","120N05183","120P05183","120P16232","120N16232","120-05183","120+05184","120N05184","120+05185","120P05184","120P17745","120N17745","120P05108","120N05108","120+05109","120P05109","120N05109","120N04939","120P04939","120+05110","120-05109","120+04940","120-04939","120N05110","120P05110","120N04940","120P04940","120-04940","120+04941","120N04941","120P04941","120P25617","120N05384","120P05384","120+05385","120P04936","120-05384","120P25615","120+04937","120N04936","120N05385","120P05385","120+04938","120-04936","120N04937","120P04937","120P25633","120-05385","120+05386","120-04937","120P04938","120N04938","120-04938","120+04939","120N05386","120P06782","120P05386","120N06782","120-05110","120+05111","120P05111","120N05111","120+05112","120-05111","120-05386","120+05387","120P05112","120N05112","120+05113","120-05112","120-05184","120P18706","120N18706","120-19523","120+16939","120N05185","120P05185","120P17721","120N17721","120-04941","120+04942","120N04942","120P04942","120+04943","120-04942","120-05185","120+05186","120P18619","120N18619","120+19514","120P16936","120P25805","120P05162","120P05160","120P05161","120N05186","120P05210","120N05161","120N05162","120N05160","120P05186","120-05160","120-05161","120+05163","120-05162","120P04943","120N04943","120-04943","120+04944","120P04944","120N04944","120P05113","120N05113","120+05169","120-05168","120N05387","120P05387","120P17750","120N17750","120+05388","120+05114","120-05113","120P05114","120P05388","120+05115","120N05114","120N05388","120P16945","120N16945","120-05387","120P25665","120-05114","120P16095","120-05388","120+05389","120-16095","120+16096","120N05389","120P05115","120N05115","120P16238","120P16097","120P16096","120P05389","120+16098","120-05389","120+05390","120P16098","120N05390","120P05390","120N17545","120P17545","120P28136","120P05169","120N05169","120+05170","120-05169","120+05171","120+16100","120+05391","120P05171","120P05170","120N05170","120N05171","120+05172","120N05172","120P05172","120+05173","120-05172","120-05115","120+05116","120N05117","120P05117","120-05117","120+05118","120P05409","120N05409","120N05142","120N05118","120P05118","120P05142","120-05409","120+05410","120+05143","120-05142","120P05143","120N05143","120-05410","120+05411","120P04804","120N05411","120P05411","120-04804","120P04805","120N04820","120P04820","120-04819","120P04819","120N04819","120+04820","120+04815","120N04805","120+04806","120-04805","120P04806","120N04806","120+04807","120-04806","120P04807","120N04807","120+04808","120P26673","120P04429","120N04429","120-04430","120N04430","120-04429","120+04430","120P04430","120+04431","120+04813","120-04812","120+04814","120N04813","120P04814","120N04814","120-04814","120-04813","120P04813","120P04812","120P04431","120N04812","120N04431","120+04432","120-04431","120P04432","120N04432","120+04433","120-04811","120+04812","120P04811","120N04811","120-04432","120P04434","120P04433","120N04433","120N21386","120P21386","120P23094","120N23094","120N04434","120+04435","120-04434","120P04435","120N04435","120+04436","120-04435","120+04818","120-04817","120P04817","120N04817","120+04817","120-04816","120+04816","120P04815","120N04815","120-04815","120P04818","120N04818","120+04819","120-04818","120+04448","120-04447","120P04447","120N22395","120P22395","120N04447","120P04446","120N04446","120P04445","120+04446","120-04445","120N04445","120+04447","120-04446","120N19722","120+04445","120-04444","120P04444","120N04444","120-22854","120+22855","120+16513","120-16512","120+04439","120-04438","120P30117","120+04440","120-04439","120P04440","120P30115","120P30119","120N04440","120-04436","120+04437","120N04437","120N04436","120P04436","120P25869","120+04438","120P04438","120N04438","120-04437","120-22581","120+22582","120P05073","120N05073","120P26075","120+05073","120-05072","120P05072","120N05072","120+05072","120-05071","120P05071","120N05071","120+05074","120-05073","120P04443","120N04443","120+04441","120-04440","120P04441","120N04441","120+04442","120N04442","120-17135","120+16114","120+04443","120-04442","120-04441","120P04442","120+04444","120-04443","120-07183","120+07184","120P22271","120N22271","120N07184","120+07185","120-07184","120P07185","120N07185","120P07184","120P05352","120N05352","120P10334","120N10334","120P19028","120P05353","120N19028","120+05354","120-05353","120P05354","120N05354","120P06825","120N06825","120N05353","120+05353","120-05352","120-06342","120-05355","120-28011","120+05356","120+17125","120N05355","120P05355","120N06793","120N06343","120-06793","120P06796","120-06795","120-05354","120+05355","120+17133","120-16008","120-18552","120+18553","120+10244","120-10243","120P17125","120P18552","120+06798","120-06797","120+17072","120-17071","120+06799","120P17072","120-06798","120P10243","120N10243","120-05210","120+29406","120+16933","120-16932","120P16932","120+05211","120-29405","120-15574","120+15575","120+16932","120-16931","120N05211","120P29405","120P16588","120N16588","120N29405","120P05211","120-17072","120-05211","120+29405","120-29404","120+05212","120+16629","120-06800","120+06801","120P05212","120N29404","120-05212","120P29404","120N05212","120+29404","120+05213","120-29403","120N05213","120P29403","120P05213","120N29403","120N18551","120P18551","120+16173","120-17133","120+16009","120-18550","120+18551","120+06829","120N16411","120P06820","120P06829","120N06820","120N06829","120P16411","120+16411","120-19476","120+06821","120-06820","120+17127","120-15830","120P18811","120N18811","120P19476","120N19476","120+18812","120-18811","120P16358","120P17127","120N17127","120N16358","120+15831","120-17127","120+16155","120+05214","120-05213","120N06823","120P05214","120+06824","120P18173","120N18173","120-06823","120P06822","120-06821","120N05214","120P06823","120-06822","120+06823","120+18168","120+18174","120-18173","120N06822","120N19267","120P19267","120-06824","120+29403","120P06821","120N06821","120+06822","120+15832","120-15831","120-05351","120+05352","120N05351","120P05351","120P19498","120N19498","120N18838","120P18838","120-11756","120+05351","120P16870","120N16870","120+16870","120-16869","120P18109","120N18109","120N11756","120-16868","120P11756","120+16869","120+06812","120-16684","120+11756","120P16868","120P06812","120N16868","120-05350","120N06812","120N05350","120P05350","120-05349","120+05350","120-18158","120+18159","120P05349","120N05349","120P18159","120N18159","120+05349","120-05348","120P17861","120P05348","120N17861","120N05348","120-18115","120+17101","120+15631","120-16675","120+10236","120-10949","120-15832","120+15833","120P05007","120+05007","120-05006","120N16570","120N05007","120-06785","120+28017","120+15686","120N18117","120+07671","120-29530","120+06811","120-19412","120N06811","120N04881","120P06811","120P04881","120-29544","120+29530","120-07670","120+04882","120-04881","120P04882","120+04883","120+10949","120N04882","120N18965","120P18965","120-17561","120+17560","120-04882","120P04883","120N04883","120-04883","120+04884","120+17193","120+04999","120-04998","120P28284","120N04884","120P28282","120P04884","120P16766","120+15231","120P15230","120N15230","120-04884","120+04885","120+16767","120P26135","120P28286","120P16337","120P26943","120N16291","120N04999","120P04999","120P16291","120-16291","120-18147","120+16292","120+05000","120-04999","120-05368","120+05369","120N05369","120P05369","120+05370","120P05000","120P16339","120-05369","120P05370","120N05000","120N05005","120P05005","120-05004","120+05005","120N05004","120P05004","120+05006","120-05005","120P05006","120N05006","120-06787","120N28017","120+06788","120P28017","120-15240","120-15241","120-06783","120-06788","120-28017","120-05292","120P05293","120N05293","120+05293","120-05000","120+05001","120+05002","120-05001","120P05001","120N05001","120-05003","120+05004","120N05003","120P05003","120+05003","120P28508","120-05002","120P15839","120N15839","120-15839","120P05002","120N05002","120P06736","120N06736","120P15840","120N05292","120P05292","120P18725","120N18725","120-19130","120-05291","120+19131","120+05292","120P28494","120P28498","120+06737","120P28850","120-06736","120P05291","120P28818","120P19130","120N19130","120N05291","120P28854","120P28852","120P28814","120P28820","120P28848","120P28816","120P28840","120P28844","120+19130","120P28842","120P28846","120P28824","120P28826","120P28832","120+17794","120-17793","120+05348","120-05347","120P05347","120P30021","120N05347","120+05347","120-05346","120P05101","120N05101","120P05346","120N05346","120+05346","120-05345","120P05345","120N05345","120-07673","120+07674","120P04993","120N04993","120+04993","120-04992","120+07673","120+04994","120-04993","120+15246","120-07672","120P04994","120N04994","120-04994","120+04995","120P04995","120N04995","120+04996","120-04995","120P04996","120N04996","120+04997","120-04996","120P04997","120N04997","120-17479","120+05344","120-05343","120P04992","120+05102","120-05101","120N04992","120-05344","120+05345","120N05344","120P05344","120+05101","120-05100","120P04990","120N04990","120+04990","120-04989","120+16291","120P04998","120N04998","120-16290","120+04998","120-04997","120N05370","120+05371","120-05370","120+05372","120-05371","120+28031","120+05373","120+28912","120-28030","120-05372","120-28911","120-05290","120+05291","120-19129","120+05290","120-05289","120-05278","120+05279","120P28828","120N16714","120P28830","120P16714","120-16713","120P28856","120P28866","120P28912","120P28858","120+06850","120-06849","120P06850","120+04989","120-04988","120P04988","120N04988","120+04988","120-04987","120-04986","120+04987","120N04986","120P04986","120+04986","120-04985","120P04985","120N04985","120-04984","120+04985","120-04983","120P16974","120P26119","120P04984","120P04983","120+05332","120-05331","120N04983","120N04984","120N05332","120+04984","120P18287","120N18287","120P05333","120-05333","120+05334","120+05333","120-05332","120P05332","120P27023","120+04983","120-04982","120N04982","120P04982","120N05333","120-19003","120+19004","120P05334","120N05334","120+05335","120-05334","120-05335","120+07085","120+07086","120-07085","120-04981","120+04982","120+16934","120P25797","120P17096","120P16777","120P25793","120P25795","120N16777","120N17096","120-05186","120+05187","120-18358","120P28712","120P05163","120N05187","120P28688","120P28710","120P28696","120P05187","120N18359","120P28700","120P28702","120N05163","120+05164","120-04944","120+04945","120P05164","120-05163","120N05165","120P04945","120-04945","120N04945","120+05166","120-05165","120P05165","120N05164","120-05164","120-05187","120P28708","120+05188","120P25717","120P25685","120P28668","120P25707","120P25719","120P25713","120+04946","120N04946","120P05188","120P04946","120N05188","120P25699","120P25703","120P25697","120P25701","120+04947","120-04946","120P17681","120N17681","120P04947","120N04947","120+04948","120-04947","120P28536","120P28534","120P04948","120N04948","120P16436","120N16436","120P28538","120+04949","120P16161","120N04949","120P28530","120P04949","120P28542","120P28532","120P28524","120P28544","120+04950","120-04949","120P28526","120P06806","120N04950","120N06806","120P04950","120P28548","120P05166","120N05166","120+05167","120-05166","120P05167","120P29000","120+05189","120N05167","120P29272","120+05168","120-05167","120P05168","120N05168","120-05188","120P29002","120P19051","120N19051","120P17796","120P29282","120+05190","120+17797","120-05189","120P05190","120-04950","120+04951","120P28518","120P28516","120P28550","120P28514","120-04951","120+04952","120P28512","120P28510","120P28554","120P28552","120+17624","120P28520","120P28522","120P28546","120-04952","120P18336","120N18336","120+04953","120P05033","120P04953","120N04953","120N05033","120N04954","120P04954","120N18657","120P25809","120P18657","120P05035","120N05035","120N17602","120P17602","120+05034","120-05033","120+05013","120-05012","120P05013","120N05013","120+05014","120-05013","120P05012","120N05012","120+05036","120P25811","120-05035","120+05012","120-05011","120N05190","120P19481","120+05191","120P05191","120P17566","120N17566","120N05191","120N17654","120P17654","120+05192","120-05190","120N05192","120P26035","120P05192","120-05407","120+05408","120P25861","120N17799","120P05014","120N05014","120-05014","120P05015","120N05015","120+05016","120-05015","120P05016","120N05016","120P05405","120P05017","120+05406","120-05405","120P25859","120+19440","120+05407","120-05406","120P05406","120N05406","120P15392","120N05017","120N05405","120-05017","120+05018","120N05018","120P05018","120+05019","120-05018","120P26045","120+17800","120-17799","120-05192","120+05193","120N05020","120+05020","120N17948","120N05193","120P05020","120P05193","120-05020","120+05021","120-17800","120P05021","120N05021","120-05173","120+05174","120+05175","120-05174","120+05176","120+05144","120-05143","120P05176","120P05175","120N05176","120N05175","120+05177","120-05175","120-05176","120N05144","120P05144","120-05031","120P05177","120P04425","120N05177","120N04425","120P05032","120N04803","120-05144","120P04803","120N05032","120N05031","120+05145","120P05031","120+05032","120-05030","120+04804","120+04426","120-04425","120+04427","120-04426","120P19320","120P04427","120N04427","120+04803","120+05031","120P05030","120N05030","120+05030","120-05029","120-04802","120P04802","120N04802","120+04802","120-04801","120P04801","120N04801","120-04800","120+19318","120-19317","120+04801","120N04800","120+05027","120-05026","120P05025","120N05025","120P05026","120N05026","120P29024","120N05029","120P05029","120N05194","120+05195","120-05028","120-05194","120+05196","120-05195","120N19317","120P19317","120+05029","120P05028","120N05028","120+05028","120-05027","120P05027","120+05259","120P05259","120N05259","120-05258","120N05196","120P05196","120-05196","120P05197","120N05197","120-05197","120N16090","120P04800","120P05198","120P05199","120P28242","120N15486","120P28238","120N05198","120N05199","120P28240","120-04799","120+04800","120P05260","120N05260","120N04799","120P04799","120+19226","120-05199","120+05200","120+05260","120-05259","120-04798","120+04799","120N05027","120N04798","120P04798","120-04797","120+04798","120P04797","120N04797","120+04797","120-04796","120N04796","120P04796","120+05011","120-05010","120N05010","120P05010","120P25753","120P25755","120N05011","120N05037","120P05011","120P25773","120P05037","120P05034","120-05037","120+05038","120P05038","120N05038","120+05010","120-05009","120P05009","120N05009","120+05009","120-05008","120P05008","120N05008","120-05007","120-05038","120+05039","120P05039","120-05039","120+05943","120+05022","120-05021","120P05022","120N05022","120+05023","120-05022","120P05023","120N05023","120+05302","120N05302","120P05303","120+05303","120N05303","120+05304","120-05303","120P05302","120P05305","120N05305","120-16201","120-05305","120+05306","120-16199","120+05305","120-05304","120P05304","120N05304","120+06784","120+06786","120+06789","120+05294","120-05293","120P05294","120N05294","120-18350","120+18351","120-07081","120+07082","120-05294","120+05295","120+05296","120-05295","120+05297","120P05297","120P05296","120N05297","120N05296","120-05943","120+05040","120N05299","120P05299","120+15577","120-05296","120-15576","120+05298","120+15578","120-15577","120P16196","120P16197","120P05298","120-05297","120N15302","120P15302","120+16196","120N05298","120-05298","120+05299","120+16198","120-06892","120N05040","120P05040","120+06927","120P05301","120N05301","120P05300","120N05300","120+05301","120-05300","120+05300","120-05299","120-05301","120P05394","120-16146","120+16147","120+05432","120-06889","120+06890","120N05394","120-05431","120-05394","120-05395","120N05396","120-05396","120N05397","120+06939","120+05120","120-05119","120+06866","120-06865","120+15293","120+06867","120+06954","120-06866","120P06954","120+15294","120+15295","120+06868","120-06950","120-06867","120N06951","120+06869","120-06868","120P05024","120N05024","120P28898","120+05024","120-05023","120P05308","120N05308","120+05309","120+05308","120-05307","120+05025","120P26481","120P26129","120P26473","120+04361","120P04361","120-04360","120P28894","120P28900","120-16914","120+16915","120+04362","120N04361","120P04362","120N04362","120P05337","120P05336","120P05309","120P29322","120P29324","120-05308","120P29318","120N05336","120N05337","120N05309","120P29320","120+06963","120+15212","120P06963","120-15449","120-07041","120+05338","120-05337","120-04362","120N07053","120+04363","120P04363","120N04363","120P05338","120N05338","120-17497","120-05338","120+05339","120N05339","120P05339","120-07035","120+07036","120+05340","120-05339","120N05306","120P05306","120+05307","120-16204","120P05307","120N05307","120-05306","120+16204","120-16203","120N15429","120P15429","120+16205","120+04364","120-04363","120P04364","120N04364","120+04365","120P05340","120N05340","120-04364","120N04365","120P04365","120+05341","120-05340","120N17529","120P17529","120P15470","120N15470","120N05341","120-04795","120+04796","120N04795","120P04795","120P04367","120+04366","120-04365","120+04367","120-04366","120P05341","120-05341","120+05342","120N04367","120P04794","120N04794","120-05041","120+05042","120P05042","120N05042","120P15454","120-05123","120+05124","120-05124","120+16822","120-16821","120+16821","120-19407","120+05125","120P26067","120P26623","120P26607","120+05126","120-05125","120N05124","120P05124","120P05122","120+05122","120-05121","120N05122","120-05122","120+05123","120P28776","120+05121","120P05120","120N05120","120-05120","120P28782","120P05121","120N05121","120P28784","120P28786","120-16883","120P05123","120N05123","120-04427","120+04428","120-04428","120P26091","120+04429","120P04428","120N04428","120P26675","120-04807","120P28272","120P04808","120N04808","120+04809","120-04808","120P04809","120N04809","120+04810","120P04810","120-04810","120+04811","120-04809","120N04810","120N05200","120P05200","120-05200","120+05202","120P05202","120-18380","120+18381","120-05202","120+05203","120P05203","120N05203","120P18381","120N18381","120+05204","120-05203","120P05204","120P17756","120N05204","120N17756","120+05205","120-05204","120+05206","120-05205","120P05205","120N05205","120N05201","120P07216","120P05201","120N07216","120-05201","120P16136","120N16136","120N05202","120+16136","120-16135","120P16135","120N16135","120P16619","120N16619","120P19309","120N19309","120+16620","120-16619","120P16308","120P16620","120N16620","120+16813","120-16812","120-16620","120+16621","120P16621","120P16813","120N16428","120N04369","120P04369","120P04370","120N04370","120+04370","120-04369","120N04373","120P04373","120+16622","120-16621","120P16622","120N16622","120P18383","120N18383","120+07124","120-16622","120+04372","120-04371","120P04371","120+04373","120N07124","120-04372","120-07124","120+07125","120P04372","120N04372","120+04374","120-04373","120+04375","120P04375","120N04375","120P04374","120N04374","120-04374","120P26069","120N07125","120P05137","120+05137","120-05136","120P26781","120N05137","120-05137","120+05138","120P05138","120N05138","120N04371","120+04371","120-04370","120P05132","120+18425","120P05131","120+05132","120N05132","120-05131","120N05131","120-18424","120N17760","120P17760","120+05133","120-05132","120+18426","120-18425","120N05133","120P05136","120P07002","120N07002","120N05136","120P05134","120+05136","120-05135","120P05135","120N05135","120+05135","120-05134","120+05134","120-05133","120N05134","120+05071","120-05070","120P26505","120P05070","120P25879","120P05207","120-05206","120+05207","120P05206","120N05206","120-05207","120+05208","120N05207","120P26527","120N05070","120P25883","120P25855","120P05208","120N05208","120N22466","120P22466","120P26507","120P25849","120P25885","120+22466","120-22465","120P25841","120P26509","120-05069","120+05070","120N20675","120P20675","120-05208","120+05209","120P05209","120N05209","120N04388","120+07180","120P04388","120-05209","120P07180","120N07180","120N22762","120P22762","120+07181","120-07180","120P07181","120N07181","120+04389","120-04388","120N10871","120N19688","120P19688","120P26483","120P04377","120-04376","120N04377","120P26487","120+04378","120-04377","120P04378","120N04378","120N04376","120P04376","120-04375","120P05069","120N05069","120P26533","120+05069","120+04379","120-04378","120N05068","120P05068","120P26515","120P25873","120P04379","120+04380","120N04379","120P04380","120N04380","120-04379","120-05067","120+05068","120N19691","120P19691","120N05067","120P05067","120+23105","120-23104","120P07182","120N07182","120+07182","120-07181","120N07183","120P23105","120N23105","120+07183","120-07182","120P07183","120P04389","120+04391","120-04390","120N04389","120+04390","120-04389","120P04390","120N04390","120-04380","120+04381","120N04381","120P04381","120-04381","120+04382","120P07095","120N07095","120+07096","120-07095","120P07096","120N07096","120P04382","120N04382","120+04383","120-04382","120+07097","120-07096","120P07097","120P21615","120N07097","120+07098","120-07097","120+04376","120-05138","120+05139","120N05139","120+05067","120-05066","120P27063","120-05139","120P25891","120+05140","120P05139","120P25893","120P05140","120N05140","120P05141","120P07093","120N05141","120N07093","120-07093","120+07094","120N07094","120P07094","120N22764","120P22764","120-07094","120+07095","120-19562","120+19563","120+21615","120-21616","120+04368","120-04367","120P04368","120N04368","120+04369","120-04368","120+07774","120-05342","120-05042","120+05043","120+05127","120-05126","120+05130","120P05130","120-05129","120P05129","120N05129","120+05129","120-05128","120+16145","120-16144","120P30045","120P05127","120P16145","120N05127","120+05128","120-05127","120N05043","120P05043","120N16822","120P26605","120-16822","120+07021","120-07019","120P07021","120N07021","120P05126","120N05126","120P26609","120-05043","120+05044","120+05425","120+05131","120-05130","120N05130","120+06840","120+06880","120P06880","120+06881","120+06882","120P06882","120+06838","120-06831","120+06833","120-06836","120+06860","120-06858","120+05436","120+04766","120+04767","120-04820","120+04821","120+07186","120-07185","120+04384","120-04383"]


describe('TMC Attributes', () => {
	
	test('first attributes', (done) => {
		var getEvent = {
	  		'paths': `[
	  			["tmc",["${largeTmcs.join('","')}"],"attributes",["road_name","avg_speedlimit"]]]`,
	  		'method': 'get'
	  	}
	  	console.time('tmcAttributes')
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.timeEnd('tmcAttributes')
	  		//console.log('a:', response.jsonGraph.tmc["120+04448"])
	  		expect(response.jsonGraph.tmc["120+04448"]).not.toBe(null)
	  		done()
		});
	})

})


describe('performance Measures', () => {
	
	test('first attributes', (done) => {
		var getEvent = {
	  		'paths': `[
	  			["tmc",["${tmcs.join('","')}"],"pm3",[2017,2018],['freeflowtt', "aadt",'vd_total']]]`,
	  		'method': 'get'
	  	}
	  	console.time('measures')
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.timeEnd('measures')
	  		//console.log('m:', response.jsonGraph.tmc["120+04448"] )
	  		expect(response.jsonGraph.tmc["120+04448"]).not.toBe(null)
	  		done()
		});
	})

})

describe('daily travel times', () => {
	
	test('get tmcs data', (done) => {
		var getEvent = {
	  		'paths': `[
	  			["tmc",["${tmcs.join('","')}"],"day",['2017-01-01'],'tt']
	  		]`,
	  		'method': 'get'
	  	}
	  	console.time('travelTime')
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.timeEnd('travelTime')
	  		console.log('tt:', response.jsonGraph.tmc["120+04448"].day['2017-01-01'].tt )
	  		expect(response.jsonGraph.tmc["120+04448"]).not.toBe(null)
	  		done()
		});
	})

})


describe('daily avg travel times', () => {
	
	test('get tmcs data', (done) => {
		var getEvent = {
	  		'paths': `[
	  			["tmc",["${tmcs.join('","')}"],"year",[2017],'avgtt']
	  		]`,
	  		'method': 'get'
	  	}
	  	console.time('avgTravelTime')
	  	falcorGraph.respond({queryStringParameters: getEvent}, (error, response) => {
	  		console.timeEnd('avgTravelTime')
	  		//console.log('avgtt:', response.jsonGraph.tmc["120+04448"].year[2017].avgtt )
	  		expect(response.jsonGraph.tmc["120+04448"]).not.toBe(null)
	  		done()
		});
	})

})



	


afterAll(() => {
  return falcorGraph.close();
});
