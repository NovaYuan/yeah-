var Type = (function(){
        var $el = $(".content");
        this.typeWords = function(){
                var loadLine = "<span class='load-line' style='display: none;'>_</span>",
                        content = "",
                        words_one = "1989年的一个冬天，叶大神降临到人间。",
                        words_two = "今天，是叶大神来到人间的第<span class='special'>26</span>个年头。",
                        words_three = "人间很美，",
                        words_four = "大神还是先闯关吧~",
                        wordsArr = [words_one, words_two, words_three, words_four];

                $.each(wordsArr, function(i, o){
                        var line = o.split("");
                        $.each(line, function(j, q){
                                if(q == line[line.length - 1] ){
                                        content +=  "\n";
                                        $el.html(content)
                                }else{
                                        $el.html(content + loadLine);
                                        var $loadLine = $(".load-line");
                                        $loadLine.show();
                                        setTimeout(function(){
                                                $loadLine.remove();
                                                content += q;
                                                //$el.html(content)
                                        }, 5000);
                                        //content += q;
                                        //$el.html(content)
                                }
                        })
                });
        };

        this.initPic = function(){
                var $content = $(".content"),
                        $gameContainer = $(".img-game-container"),
                        $contentTitle = '<h2>首先，我们来玩个游戏，请在屏幕中找出最后一小块图</h2>',
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

                        //$(".img-bread").last().removeClass("img-bread-show").addClass("");

                        setTimeout(function(){
                                $(".footer").show();
                        }, 500)
                })
        };
        this.render = function(){
                var that = this;

                that.initPic();
        };

        var eventHandler = {
                showPicHandler: function(){
                        var $this = $(this);

                        if($this.hasClass("img-bread-hide")){
                                $this.removeClass("img-bread-hide");
                                $this.children("img").css({
                                        "visibility": "visible"
                                });
                                alert("机智如你！")
                        }
                },
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
                }
        };

        this.render();
        //事件处理
        $("body").on('click', ".img-bread-hide", eventHandler.showPicHandler);
        $("body").on('click', ".img-bread-show", eventHandler.movePicHandler);
})();