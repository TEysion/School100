(function () {

    var viewH = $(window).height();  //可见高度 
    var viewW = $(window).width();  //可见高度
    var value = 10000;
    if (viewH > viewW) {
        temp = viewH;
        viewH = viewW;
        viewW = temp;
    }

    var scroH;
    function vposmove($elem, fromh, toh, frompos, topos, nowh) {
        if ($elem == null) return;
        if (nowh < fromh || nowh > toh) return;
        $elem.css({
            "top": frompos + (topos - frompos) * (nowh - fromh) / (toh - fromh)
        });
    }

    function hposmove($elem, fromh, toh, frompos, topos, nowh) {
        if ($elem == null) return;
        if (nowh < fromh || nowh > toh) return;
        $elem.css({
            "left": frompos + (topos - frompos) * (nowh - fromh) / (toh - fromh)
        });
    }

    function fontscale($elem, fromh, toh, froms, tos, nowh) {
        if ($elem == null) return;
        if (nowh < fromh || nowh > toh) return;
        $elem.css({
            "font-size": froms + (tos - froms) * (nowh - fromh) / (toh - fromh)
        });
    }

    function wordspace($elem, fromh, toh, froms, tos, nowh) {
        if ($elem == null) return;
        if (nowh < fromh || nowh > toh) return;
        $elem.css({
            "letter-spacing": froms + (tos - froms) * (nowh - fromh) / (toh - fromh)
        });
    }

    function opacity($elem, fromh, toh, fromo, too, nowh) {
        if ($elem == null) return;
        var rst = fromo + (too - fromo) * (nowh - fromh) / (toh - fromh);
        if (nowh < fromh)return;
        else if (nowh > toh) return;
        $elem.css({
            "opacity": rst
        });
    }

    function scale($elem, fromh, toh, froms, tos, nowh) {
        if ($elem == null) return;
        var rst = (froms + (tos - froms) * (nowh - fromh) / (toh - fromh) )*viewW/100.0;
        if (nowh < fromh)return;
        else if (nowh > toh) return;
        $elem.css({
            "width": rst,
            "left": viewW / 2 - rst / 2
        });
    }


    function newtitle(title) {
        var $t;
        $t = $("<h2 align='center'></h2>").text(title);
            $t.css({
                "z-index": 0,
                "top": 10000,
                "position": "fixed",
                "font-size": viewW / 20,
                "background-color": "#ffffff90",
                "padding":10,
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none"
            });
        $(".rt").append($t);
        return $t;
    }


    function newtext(text) {
        var $t;
        $t = $("<h2 align='center'></h2>").text(text);
            $t.css({
                "z-index": 0,
                "top": 10000,
                "text-align": "left",
                "background-color": "#ffffff90",
                "padding":10,
                "position": "fixed",
                "width": viewW / 5 * 4,
                "margin": 0,
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none"
            });
        $(".rt").append($t);
        return $t;
    }

    function newimage(src) {
        var $t;
        var rst = 110*viewW/100.0;
        $t = $("<img src='" + src + "'></img>");
            $t.css({
                "z-index": -10,
                "top": 10000,
                "right": 10,
                "width": rst,
                "left": viewW / 2 - rst / 2,
                "object-fit": "cover",
                "height": "100%",
                "position": "fixed",
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none"
            });
        $(".rt").append($t);
        return $t;
    }


    //左侧渐出
    function zuocejianchu($t, h1, h2) {
        opacity($t, h1, h2, 1, 0, scroH);
        hposmove($t, h1, h2, 0, -viewW, scroH);
        //出场后
        opacity($t, h2, h2 + value, 0, 0, scroH);
    }
    //右侧渐入
    function youcejianru($t, h1, h2) {
        //入场前
        opacity($t, h1 - value, h1, 0, 0, scroH);
        //入场
        vposmove($t, h1, h2, 0, 0, scroH);
        hposmove($t, h1, h2, viewW, 10, scroH);
        opacity($t, h1, h2, 0, 1.0, scroH);
        vposmove($t, h1, h2, 0, 0, scroH);
        //停留阶段缓慢移动
        hposmove($t, h2, h2 + 1000, 10, 0, scroH);
    }

    //上侧渐出
    function shangcejianchu($t, h1, h2) {
        opacity($t, h1, h2, 1, 0, scroH);
        vposmove($t, h1, h2, 0, -viewH, scroH);
        //出场后
        opacity($t, h2, h2 + value, 0, 0, scroH);
    }
    //下侧渐入
    function xiacejianru($t, h1, h2) {
        //入场前
        opacity($t, h1 - value, h1, 0, 0, scroH);
        //入场
        opacity($t, h1 - 1000, h1, 0, 0, scroH);
        vposmove($t, h1, h2, 300, 10, scroH);
        opacity($t, h1, h2, 0, 1.0, scroH);
        //停留阶段缓慢移动
        vposmove($t, h2, h2 + 1000, 10, 0, scroH);
    }

    //下侧渐出
    function xiacejianchu($t, h1, h2) {
        opacity($t, h1, h2, 1, 0, scroH);
        vposmove($t, h1, h2, 0, viewH, scroH);
        //出场后
        opacity($t, h2, h2 + value, 0, 0, scroH);
    }
    //上侧渐入
    function shangcejianru($t, h1, h2) {
        //入场前
        opacity($t, h1 - value, h1, 0, 0, scroH);
        //入场
        opacity($t, h1, h2, 0, 1, scroH);
        vposmove($t, h1, h2, -viewH, -10, scroH);
        //停留阶段缓慢移动
        vposmove($t, h2, h2 + 1000, -10, 0, scroH);
    }

    //缩小渐出
    function suoxiaojianchu($t, h1, h2) {
        opacity($t, h1, h2, 1, 0, scroH);
        scale($t, h1, h2, 110, 50, scroH);
        //出场后
        opacity($t, h2, h2 + value, 0, 0, scroH);
    }
    //缩小渐入
    function suoxiaojianru($t, h1, h2) {
        //入场前
        opacity($t, h1 - value, h1, 0, 0, scroH);
        //入场
        scale($t, h1, h2, 200, 120, scroH);
        vposmove($t, h1, h2, 0, 0, scroH);
        opacity($t, h1, h2, 0, 1, scroH);
        //停留阶段缓慢移动
        scale($t, h2, h2 + 1000, 120, 110, scroH);
    }

    //渐出
    function jianchu($t, h1, h2) {
        opacity($t, h1, h2, 1, 0, scroH);
        //出场后
        opacity($t, h2, h2 + value, 0, 0, scroH);
    }
    //渐入
    function jianru($t, h1, h2) {
        //入场前
        opacity($t, h1 - value, h1, 0, 0, scroH);
        //入场
        opacity($t, h1, h2, 0, 1, scroH);
        vposmove($t, h1, h2, 0, 0, scroH);
        // //停留阶段缓慢移动
        // scale($t, h2, h2 + 1000, 110, 110, scroH);
    }

    //放大渐出
    function fangdajianchu($t, h1, h2) {
        opacity($t, h1, h2, 1, 0, scroH);
        scale($t, h1, h2, 110, 200, scroH);
        vposmove($t, h1, h2, 0, 0, scroH);
        opacity($t, h1, h2, 1, 0, scroH);
        //出场后
        opacity($t, h2, h2 + value, 0, 0, scroH);
    }
    //放大渐入
    function fangdajianru($t, h1, h2) {
        //入场前
        opacity($t, h1 - value, h1, 0, 0, scroH);
        //入场
        scale($t, h1, h2, 70, 100, scroH);
        opacity($t, h1, h2, 0, 1, scroH);
        vposmove($t, h1, h2, 0, 0, scroH);
        //停留阶段缓慢移动
        scale($t, h2, h2 + 1000, 100, 110, scroH);
    }

    function textAnim($t1, $t2, h5, h6, h7, h8, sh = viewH/2) {
        //文字入场前
        opacity($t1, h5 - value, h5, 0, 0, scroH);
        opacity($t2, h5 - value, h5, 0, 0, scroH);
        //文字入场
        vposmove($t1, h5, h6, sh, sh, scroH);
        vposmove($t2, h5, h6, sh + viewW / 20 + 25 , sh + viewW / 20 + 25, scroH);
        hposmove($t1, h5, h6, -viewW, 100, scroH);
        hposmove($t2, h5, h6, -viewW - 500, 100, scroH);
        opacity($t1, h5, h6, 0, 1.0, scroH);
        opacity($t2, h5, h6, 0, 1.0, scroH);
        //文字停留阶段
        hposmove($t1, h6, h7, 100, 100, scroH);
        hposmove($t2, h6, h7, 100, 100, scroH);
        //文字出场
        opacity($t1, h7, h8, 1, 0, scroH);
        opacity($t2, h7, h8, 1, 0, scroH);
        //文字出场后
        opacity($t1, h8, h8 + value, 0, 0, scroH);
        opacity($t2, h8, h8 + value, 0, 0, scroH);
    }

    var once = 0;

    $(document).scroll(function () {
        scroH = $(document).scrollTop();  //滚动高度

        if (once == 0) {

            window.onbeforeunload = function () {
                document.documentElement.scrollTop = 0;  //ie下
                document.body.scrollTop = 0;  //非ie
            }

            $(".ttst").css({
                "z-index": 0,
                "top": 10000,
                "position": "fixed",
                "margin": 0,
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none",
            });
            

            $ddls = $("<h2 align='center'></h2>").text("奋进百年 起航东大");
            $ddls.css({
                "z-index": 0,
                "top": scroH + 1000,
                "position": "fixed",
                "width": viewW,
                "color": "red",
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none"
            });
            $(".rt").append($ddls);


            $fly = $("<img src='./res/fly.png'></img>");
            $fly.css({
                "z-index": -10,
                "top": scroH + 1000,
                "position": "fixed",
                "width": 300,
                "height": 300,
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "-ms-user-select": "none"
            });
            $(".rt").append($fly);
        
            {
                
                $t11 = newtitle("1923年4月 东北大学成立");
                $t12 = newtext("1923年4月26日，奉天省公署颁发的东北大学校印正式启用，东北大学肩负民族复兴之重托诞生于白山黑水之间。");
                $t13 = newimage("./res/1.jpg");

                $t21 = newtitle("1923年7月 东北大学北陵校舍");
                $t22 = newtext("1923年7月，东北大学举行北陵校舍奠基仪式（前排左8为刘尚清，左9为王永江，左10为张学良）。");
                $t23 = newimage("./res/2.jpg");

                $t31 = newtitle("1923年10月24日 东北大学开学典礼");
                $t32 = newtext("1923年10月24日东北大学首届开学典礼举行");
                $t33 = newimage("./res/3.jpg");

                $t41 = newtitle("1928年8月 张学良将军兼任校长");
                $t42 = newtext("1928年8月，主政东北的张学良兼任东北大学校长，对东北大学的建设和管理采取了一系列新的举措，使东北大学很快发展成为当时国内一流大学。");
                $t43 = newimage("./res/4.jpg");

                $t51 = newtitle("1928年9月 创建中国第一个建筑系");
                $t52 = newtext("1928年9月，东北大学创建了全国高校首个建筑系。梁思成、林徽因留美归来接受东北大学的聘请，共同执教东北大学建筑系，他们夫妇二人是东北大学建筑系最早聘任到校的教授。");
                $t53 = newimage("./res/5.jpg");

                $t61 = newtitle("1929年 林徽因设计校徽");
                $t62 = newtext("1929年，张学良校长设奖征集东北大学新校徽。林徽因教授设计的“白山黑水”校徽在众多的设计作品中脱颖而出。");
                $t63 = newimage("./res/6.jpg");

                $t71 = newtitle("1931年9月26日 师生迁往北平");
                $t72 = newtext("九一八事变，东北大学校园被日寇占领，东北大学被迫成为近代中国第一所流亡大学。1931年9月26日，东北大学大部分师生迁往北平，教授们组织“教授代表会”，推动学校复校事宜，学生也成立了“东大临时学生会”，协助教授们工作。10月18日，学校借北平南兵马司旧税务监督公署为校舍，勉强复课。因条件所限，部分系科停办，同时添加边疆政治系、家政系等实用学科。");
                $t73 = newimage("./res/7.jpg");

                $t81 = newtitle("1932年 中国奥运第一人刘长春");
                $t82 = newtext("1932年，东北大学学生刘长春在张学良校长支持下，作为唯一的运动员代表中国参加在洛杉矶举行的第十届奥运会，成为中国参加奥运会正式比赛项目的第一人。");
                $t83 = newimage("./res/8.jpg");

                $t91 = newtitle("1935年 一二九运动");
                $t92 = newtext("1935年12月9日，北平爆发了大规模的爱国运动——一二九运动，东北大学师生始终走在请愿游行队伍的最前列，发挥了主力军和先锋队的作用。东北大学学生宋黎为请愿队伍总指挥，带领示威人群高呼口号。这场以学生为主力的抗日爱国运动广泛地宣传了“停止内战、一致对外”的抗日主张，极大地促进了中华民族的觉醒，标志着中国人民抗日救亡运动高潮的到来。");
                $t93 = newimage("./res/9.jpg");

                $t101 = newtitle("1936年 西安事变的导火索");
                $t102 = newtext("1936年12月9日，以东北大学西安分校为主的西安学生和各界人士举行了纪念一二九运动一周年的游行。这次请愿游行成为“西安事变”的导火索。");
                $t103 = newimage("./res/10.jpg");

                $t111 = newtitle("1938年3月 东北大学迁往三台");
                $t112 = newtext("1938年3月，日军西犯，由于敌人空袭频繁，西安已不能照常上课。3月中旬，东北大学举校迁往四川省三台县。东北大学在三台办学八年，不仅给三台带去了教育的文明和繁荣，还带动了很多先进的革命思想，推动了抗日救亡运动和地方文化教育事业发展，在三台历史上留下了光辉的一页。抗战胜利后，东北大学师生陆续从三台返回沈阳，在北陵校址开学。");
                $t113 = newimage("./res/11.jpg");

                $t121 = newtitle("1950年 东北工学院成立");
                $t122 = newtext("1949年9月7日，以东北大学工学院、理学院（部分）为基础，成立沈阳工学院。1950年8月23日，东北人民政府发布命令，将沈阳工学院、抚顺矿专、鞍山工专等三校合组，总部设在沈阳，抚顺、鞍山设分院，定名为东北工学院，隶属国家冶金工业部，校址设在沈阳南湖。");
                $t123 = newimage("./res/12.jpg");

                $t131 = newtitle("1960年 东北工学院被列为重点大学");
                $t132 = newtext("1960年10月，根据中共中央《关于增加全国重点高等学校的决定》，东北工学院被列为全国64所重点大学之一。");
                $t133 = newimage("./res/13.jpg");

                $t141 = newtitle("1996年 首批“211 工程”院校");
                $t142 = newtext("1996年，东北大学成为全国首批进入“211 工程”建设的重点大学之一。");
                $t143 = newimage("./res/14.jpg");

                $t151 = newtitle("2012年12月27日 浑南新校区");
                $t152 = newtext("2012年，东北大学启动浑南新校区建设。2014年秋季开学伊始，浑南校区正式投入使用，首批入驻学院包括工商管理学院、医学与生物信息工程学院、生命科学与健康学院、江河建筑学院、马克思主义学院、文法学院、软件学院、计算机科学与工程学院、机器人科学与工程学院等八个学院，入住学生近12000人。");
                $t153 = newimage("./res/15.jpg");

                $t161 = newtitle("2017年9月 进入一流大学高校行列");
                $t162 = newtext("2017年，东北大学被教育部、财政部、国家发展改革委确定为一流大学建设高校。");
                $t163 = newimage("./res/16.jpg");

                $t171 = newtitle("2022年 入选新一轮“双一流”高校");
                $t172 = newtext("2022年，东北大学入选新一轮“双一流”建设高校名单，以“控制科学与工程”“冶金工程”两个“双一流”建设学科为引领，带动学科建设水平整体提升。");
                $t173 = newimage("./res/17.jpg");

                $t183 = newimage("./res/18.jpg");
                $t193 = newimage("./res/19.jpg");
                $t203 = newimage("./res/20.jpg");
                $t213 = newimage("./res/21.jpg");
                $t223 = newimage("./res/22.jpg");
                $t233 = newimage("./res/23.jpg");
                $t243 = newimage("./res/24.jpg");
            }
            once++;
        }

        //图片1
        {
            var $t1 = $t11, $t2 = $t12, $t3 = $t13;
            var h1 = 1500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;

            //入场
            youcejianru($t13, h1, h2);

            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);

            //出场
            jianchu($t3, h3, h4);
        }

        //图片2
        {
            var $t1 = $t21, $t2 = $t22, $t3 = $t23;
            var h1 = 3000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            xiacejianru($t23, 3000, 3500);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8, viewH / 4);
            //出场
            suoxiaojianchu($t3, h3, h4);
        }

        //图片3
        {
            var $t1 = $t31, $t2 = $t32, $t3 = $t33;
            var h1 = 4500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            suoxiaojianru($t33, 4500, 5000);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8, viewH / 5);
            //出场
            fangdajianchu($t3, h3, h4);
        }


        //图片4
        {
            var $t1 = $t41, $t2 = $t42, $t3 = $t43;
            var h1 = 6000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            fangdajianru($t43, 6000, 6500);
            xiacejianru($t43, 6000, 6500);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8, viewH / 4 * 3);
            //出场
            zuocejianchu($t3, h3, h4);
        }


        //图片5
        {
            var $t1 = $t51, $t2 = $t52, $t3 = $t53;
            var h1 = 7500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            youcejianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            fangdajianchu($t3, h3, h4, 1, 0, scroH);
        }


        //图片6
        {
            var $t1 = $t61, $t2 = $t62, $t3 = $t63;
            var h1 = 9000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            fangdajianru($t3, h1, h2, 0, 0, scroH);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            zuocejianchu($t3, h3, h4);
        }

        //图片7
        {
            var $t1 = $t71, $t2 = $t72, $t3 = $t73;
            var h1 = 10500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            youcejianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            shangcejianchu($t3, h3, h4);
            
        }

        //图片8
        {
            var $t1 = $t81, $t2 = $t82, $t3 = $t83;
            var h1 = 12000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            xiacejianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            suoxiaojianchu($t3, h3, h4);
        }

        //图片9
        {
            var $t1 = $t91, $t2 = $t92, $t3 = $t93;
            var h1 = 13500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            suoxiaojianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            jianchu($t3, h3, h4);
        }

        //图片10
        {
            var $t1 = $t101, $t2 = $t102, $t3 = $t103;
            var h1 = 15000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8, viewH / 5 * 3);
            //出场
            jianchu($t3, h3, h4);
        }

        //图片11
        {
            var $t1 = $t111, $t2 = $t112, $t3 = $t113;
            var h1 = 16500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8, viewH / 5);
            //出场
            fangdajianchu($t3, h3, h4);
        }

        //图片12
        {
            var $t1 = $t121, $t2 = $t122, $t3 = $t123;
            var h1 = 18000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            xiacejianru($t3, h1, h2);
            fangdajianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            suoxiaojianchu($t3, h3, h4);
            zuocejianchu($t3, h3, h4 + 200);
            jianchu($t3, h3, h4 - 200);
        }

        //图片13
        {
            var $t1 = $t131, $t2 = $t132, $t3 = $t133;
            var h1 = 19500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            jianchu($t3, h3, h4);
        }

        //图片14
        {
            var $t1 = $t141, $t2 = $t142, $t3 = $t143;
            var h1 = 21000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8, viewH / 5 * 3);
            //出场
            jianchu($t3, h3, h4);
        }

        //图片15
        {
            var $t1 = $t151, $t2 = $t152, $t3 = $t153;
            var h1 = 22500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            fangdajianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            fangdajianchu($t3, h3, h4);
        }

        //图片16
        {
            var $t1 = $t161, $t2 = $t162, $t3 = $t163;
            var h1 = 24000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            fangdajianru($t3, h1, h2);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            suoxiaojianchu($t3, h3, h4);
        }

        //图片17
        {
            var $t1 = $t171, $t2 = $t172, $t3 = $t173;
            var h1 = 25500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            opacity($t3, h2, h2 + 3000, 1, 1, scroH);
            scale($t3, h1, h2 + 3000, 350, 110, scroH);
            //文字
            textAnim($t1, $t2, h5, h6, h7, h8);
            //出场
            jianchu($t3, h2 + 3000, h2 + 3000 + 1000);
        }

        //图片18
        {
            var $t3 = $t183;
            var h1 = 29000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //出场
            jianchu($t3, h2 + 3000, h2 + 3000 + 1000);
        }

        //图片19
        {
            var $t3 = $t193;
            var h1 = 30500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //出场
            jianchu($t3, h2 + 3000, h2 + 3000 + 1000);
        }

        //图片20
        {
            var $t3 = $t203;
            var h1 = 32000, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //出场
            jianchu($t3, h2 + 3000, h2 + 3000 + 1000);
        }

        //图片21
        {
            var $t3 = $t213;
            var h1 = 33500, h2 = h1 + 500, h3 = h2 + 1000, h4 = h3 + 500;
            var h5 = h2 - 200, h6 = h2 + 300, h7 = h3 - 200, h8 = h4 - 200;
            //入场
            jianru($t3, h1, h2);
            //出场
            jianchu($t3, h2 + 3000, h2 + 3000 + 1000);
        }



        {
            $t = $(".ttst");
            h1 = 34500;
            h2 = 36000;
            var width = document.getElementsByClassName("ttst")[0].offsetWidth;
            var height = document.getElementsByClassName("ttst")[0].offsetHeight;
            //入场前
            opacity($t, h1 - 1000, h1, 0, 0, scroH);
            //入场
            opacity($t, h1 - 1000, h1, 0, 0, scroH);
            vposmove($t, h1, h2, 300, viewH / 2 - height / 2 + 10, scroH);
            opacity($t, h1, h2, 0, 1.0, scroH);
            //停留阶段缓慢移动
            vposmove($t, h2, h2 + 1000, viewH / 2 - height / 2 + 10, scroH);
            $(".ttst").css({
                "left": viewW / 2 - width / 2
            });
        }

        vposmove($ddls, 0, 800, viewH, viewH / 2, scroH);
        vposmove($ddls, 800, 1300, viewH / 2, viewH / 3, scroH);
        fontscale($ddls, 0, 800, 40, 80, scroH);

        vposmove($ddls, 1300, 2000, viewH / 3, 0, scroH);
        hposmove($ddls, 1300, 2000, 0, -viewW/ 2 + 100 , scroH);
        fontscale($ddls, 1300, 2000, 80, 20, scroH);
        opacity($ddls, 1300, 2000, 1, 0, scroH);

        vposmove($fly, 500, 2000, viewH, -300, scroH);
        hposmove($fly, 500, 2000, viewW - 20, 20, scroH);

    });


})();