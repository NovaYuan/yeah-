var Type = (function(){
        var $body = $("body"),
                $el = $(".content"),
                completing = 0,
                completed = false;
        //this.typeWords = function(){
        //        var loadLine = "<span class='load-line' style='display: none;'>_</span>",
        //                content = "",
        //                words_one = "1989年的一个冬天，叶大神降临到人间。",
        //                words_two = "今天，是叶大神来到人间的第<span class='special'>26</span>个年头。",
        //                words_three = "人间很美，",
        //                words_four = "大神还是先闯关吧~",
        //                wordsArr = [words_one, words_two, words_three, words_four];
        //
        //        $.each(wordsArr, function(i, o){
        //                var line = o.split("");
        //                $.each(line, function(j, q){
        //                        if(q == line[line.length - 1] ){
        //                                content +=  "\n";
        //                                $el.html(content)
        //                        }else{
        //                                $el.html(content + loadLine);
        //                                var $loadLine = $(".load-line");
        //                                $loadLine.show();
        //                                setTimeout(function(){
        //                                        $loadLine.remove();
        //                                        content += q;
        //                                }, 5000);
        //                        }
        //                })
        //        });
        //};

        this.initPic = function(){
                var $content = $(".content"),
                        $gameContainer = $(".img-game-container"),
                        $contentTitle = '<h2>首先，我们来玩个游戏，先完成拼图</h2>',
                        randomNum = Math.floor(Math.random()*9),
                        isHidden = "";

                $content.prepend($contentTitle);
                $.getJSON("data.json", function(data){
                        var imgContent = "",
                                imgPreview =
                                        '<div class="preview">' +
                                        '<h5>原图参照</h5>' +
                                        '<div class="am-u-sm-6 no-padding-left">' +
                                        '<img src="images/9.jpg"/>' +
                                        '</div>' +
                                        '</div>';

                        //打乱顺序
                        data = data.sort(function(a, b){
                                return Math.random() > 0.5 ? -1:1
                        });
                        $.each(data, function(i, o){
                                var url,
                                        imgHide = "";
                                if(i == randomNum){
                                        isHidden = "img-bread-hide";
                                        imgHide = "img-hide";
                                        url = "";
                                }else{
                                        isHidden = "";
                                        url = o.url;
                                }
                                imgContent +=  '<div data-no="'+ (i + 1) +'" data-id="'+ (o.id + 1) +'" class="am-u-sm-4' +
                                        ' no-padding-left' +
                                        ' padding-right-2' +
                                        ' img-bread' +
                                        ' img-bread-show '+ isHidden +'">' +
                                        '<img class="'+ imgHide +'" data-url="'+ o.url +'" data-id="'+ o.id +'" src="'+ o.url +'"/>' +
                                        '</div>'
                        });
                        $gameContainer.append(imgContent);
                        $content.append(imgPreview);

                        $(".footer").show();
                        $.AMUI.progress.done();
                })
        };
        this.render = function(){
                var that = this;

                $.AMUI.progress.start();
                that.initPic();
        };

        var eventHandler = {
                movePicHandler: function(){
                        var $this = $(this),
                                index = $this.index(),
                                rightSideArr = [2, 5, 8],
                                leftSideArr = [0, 3, 6],
                                bottomSide = index + 3,
                                topSide = index - 3;

                        switch (true){
                                case $this.next().hasClass("img-bread-hide"):
                                        if($.inArray(index, rightSideArr) < 0){
                                                $this.insertAfter($this.next());
                                        }
                                        break;
                                case $this.prev().hasClass("img-bread-hide"):
                                        if($.inArray(index, leftSideArr) < 0){
                                                $this.insertBefore($this.prev());
                                        }
                                        break;
                                case $(".img-bread-show").eq(bottomSide).hasClass("img-bread-hide"):
                                        if(bottomSide >= 0){
                                                $this.insertAfter($(".img-bread-show").eq(bottomSide));
                                                $(".img-bread-hide").insertBefore($(".img-bread-show").eq(index));
                                        }
                                        break;
                                case $(".img-bread-show").eq(topSide).hasClass("img-bread-hide"):
                                        if(topSide >= 0){
                                                $this.insertAfter($(".img-bread-show").eq(topSide));
                                                $(".img-bread-hide").insertAfter($(".img-bread-show").eq(index));
                                        }
                                        break;
                        }

                        if($(".img-bread-show:eq(0)").data("id") == "1" &&
                                $(".img-bread-show:eq(1)").data("id") == "2" &&
                                $(".img-bread-show:eq(2)").data("id") == "3" &&
                                $(".img-bread-show:eq(3)").data("id") == "4" &&
                                $(".img-bread-show:eq(4)").data("id") == "5" &&
                                $(".img-bread-show:eq(5)").data("id") == "6" &&
                                $(".img-bread-show:eq(6)").data("id") == "7" &&
                                $(".img-bread-show:eq(7)").data("id") == "8" &&
                                $(".img-bread-show:eq(8)").data("id") == "9" ){

                                $(".img-bread-hide").children("img").css({
                                        "visibility": "visible"
                                }).removeClass("img-bread-hide");

                                setTimeout(function(){
                                        var $modal = $("#completed-alert");
                                        $modal.modal('open');
                                }, 500);
                        }
                },
                goToNextHandler: function(e){
                        e.preventDefault();

                        $("#my-words").css({
                                height: screen.height + "px"
                        });
                        $body.animate({
                                scrollTop: screen.height + 50 + "px"
                        }, 1000);
                }
        };

        this.render();
        //事件处理
        //$body.on('click', ".img-bread-hide", eventHandler.showPicHandler);
        $body.on('click', ".img-bread-show", eventHandler.movePicHandler);
        $body.on("click", ".go-to-next", eventHandler.goToNextHandler);
        $("#completed-alert").on("closed.modal.amui", function(){
                $(".next").show()
        })
})();