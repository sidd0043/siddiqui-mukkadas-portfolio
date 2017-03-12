//Get initial client height and width to use for future calculations
var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

//Information used for navigation of web pages
var textContent = {
    "#about": "aboutPage",
    "#portfolio": "portfolioPage",
    "#resume": "resumePage",
    "#contact": "contactPage",
    "aboutPage": "About Me",
    "portfolioPage": "Portfolio",
    "resumePage": "My Resume",
    "contactPage": "Contact Me"
};

//Dom Selections
var wrap = document.getElementById("wrap"),
    article = document.querySelector("article"),
    section = document.querySelectorAll("section"),
    nav = document.querySelector("nav"),
    navBtn = document.getElementById("navBtn"),
    hrefs = nav.querySelectorAll("a"),
    //portfolioDivs = document.querySelectorAll("#portfolioPage div"),
    portfolioDivs = document.querySelectorAll(".portfolioBlock"),
    portfolioModal = document.getElementById("portfolioModal"),
    resumeBlocks = document.querySelectorAll(".block");

var svgWrapper = document.querySelector(".gh-svg-wrapper"),
    svg = document.querySelector(".gh-svg"),
    svgTop = document.querySelector(".gh-svg-top"),
    svgBottom = document.querySelector(".gh-svg-bottom"),
    svgRect = document.querySelector(".gh-svg-rect");

var articleHeight = clientHeight - 45,
    sectionHeight = clientHeight - 90,
    sectionTranslate = clientHeight,
    hrefHeight = hrefs[0].clientHeight,
    bannerHeight = sectionHeight * 0.4,
    blockHeight = sectionHeight * 0.2,
    topPosition = 40,
    leftPosition = 0,
    pieceZindex = 97;

//Javascript methods
var method = {
    "init": function () {
        var hash = location.hash,
            pageId = textContent[hash],
            newHeader = textContent[pageId];

        var sectionNeeded = document.getElementById(pageId),
            imgWrap = document.querySelectorAll(".imgWrap");

        //Load home page if needed
        if (sectionNeeded === null) {
            pageId = "aboutPage";
            sectionNeeded = document.getElementById("aboutPage");
        }

        //Check if page is tablet
        if (clientWidth >= 768) {
            sectionHeight -= 15;
            sectionTranslate += 15;
        }

        //Show section chosen
        sectionNeeded.style.cssText += "-webkit-transform: translateY(" + sectionTranslate + "px); -moz-transform: translateY(" + sectionTranslate + "px); -ms-transform: translateY(" + sectionTranslate + "px); -o-transform: translateY(" + sectionTranslate + "px); transform: translateY(" + sectionTranslate + "px);";

        method.addClass(sectionNeeded, "activePage");
        method.setHeader(pageId);

        //Set initail heights
        article.style.height = articleHeight + "px";
        wrap.style.height = clientHeight + "px";
        nav.style.height = clientHeight + "px";
        portfolioModal.style.height = sectionHeight * 0.4 + "px";

        for (var i = 0; i < section.length; i++) {
            section[i].style.height = sectionHeight + "px";
        }

        for (var i = 0; i < hrefs.length; i++) {
            hrefs[i].style.lineHeight = hrefHeight + "px"
        }

        for (var i = 0; i < portfolioDivs.length; i++) {
            //Set height of first portfolioDivs with class portfolioBlock & first element child

            //Set height and zIndex of all other portfolioDivs with class portfolioBlock & first element child

            if (clientWidth < 768) {
                //portfolioDivs[i].style.cssText += "height: " + blockHeight + "px; top: " + topPosition + "%; z-index: " + pieceZindex + ";";

                topPosition += 20;
                pieceZindex -= 1;
            }

            if (clientWidth >= 768) {
                portfolioDivs[i].firstElementChild.style.height = bannerHeight + "px";

                var blockWidth = clientWidth * 0.50;

                if (i & 1) {
                    topPosition += 20;
                    leftPosition = 0;

                    if (i === 1 || i === 2) {
                        topPosition = 40;
                    }
                } else {
                    leftPosition += blockWidth;
                }

                //portfolioDivs[i].style.cssText += "height: " + blockHeight + "px; width: " + blockWidth + "px; top: " + topPosition + "%; left: " + leftPosition + "px;";
                //portfolioDivs[i].style.cssText += "height: " + blockHeight + "px; width: " + blockWidth + "px; top: " + topPosition + "%; left: " + leftPosition + "px; z-index: " + pieceZindex + ";";
            }

            //portfolioDivs[i].firstElementChild.style.height = blockHeight + "px";
        }
        return;
    },
    "setHeader": function (inputText) {
        var navHeader = document.getElementById("navHeader"),
            newHeader = textContent[inputText];

        navHeader.textContent = newHeader;
    },
    "svg": function (newSetting, original) {
        if (original !== undefined) {
            if (newSetting === "closeBtn") {
                svgTop.style.cssText += "transform: translateY(5.5px) rotate(45deg);"
                svgBottom.style.cssText += "transform: translateY(0) rotate(-45deg);"
            }

            if (newSetting === "backBtn") {
                svgTop.style.cssText += "transform: translateZ(0) rotate(-28deg);"
                svgBottom.style.cssText += "transform: translateZ(0) rotate(28deg);"
            }
        } else {
            if (newSetting === "closeBtn") {
                svgTop.style.cssText += "transform: translateY(0) rotate(0deg);"
                svgBottom.style.cssText += "transform: translateY(0) rotate(0deg);"
            }

            if (newSetting === "backBtn") {
                svgTop.style.cssText += "transform: translateZ(0) rotate(0deg);"
                svgBottom.style.cssText += "transform: translateZ(0) rotate(0deg);"
            }
        }
    },
    "hasClass": function (el, className) {
        if (el.classList) {
            return el.classList.contains(className)
        } else {
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }
    },
    "addClass": function (el, className) {
        if (el.classList) {
            el.classList.add(className)
        } else if (!hasClass(el, className)) {
            el.className += " " + className
        }
    },
    "removeClass": function (el, className) {
        if (el.classList) {
            el.classList.remove(className)
        } else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    },
    /**** Method to show specific page <section>
    
    domNode - String, Used to get id of currently selected node
    callback - Object, If callback is !undefined they method will run
    
    ****/
    "showSection": function (domNode, callback) {
        var id = domNode.getAttribute("id");

        domNode.style.cssText += "-webkit-transition: all 450ms cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 450ms cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 450ms cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 450ms cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 450ms cubic-bezier(0.4, 0.01, 0.165, 0.99); -webkit-transform: translateY(" + clientHeight + "px); -moz-transform: translateY(" + clientHeight + "px); -ms-transform: translateY(" + clientHeight + "px); -o-transform: translateY(" + clientHeight + "px); transform: translateY(" + clientHeight + "px);";

        if (id !== "nav") {
            method.setHeader(id);
        }

        if (callback !== undefined) {
            callback()
        }
    },
    "hideSection": function (domNode, callback) {
        domNode.style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -webkit-transform: translateY(" + (-clientHeight) + "px); -moz-transform: translateY(" + (-clientHeight) + "px); -ms-transform: translateY(" + (-clientHeight) + "px); -o-transform: translateY(" + (-clientHeight) + "px); transform: translateY(" + (-clientHeight) + "px);";

        if (callback !== undefined) {
            callback()
        }
    },
    "showBlock": function (domNode) {
        var imgWrap = portfolioModal.getElementsByClassName("imgWrap"),
            img = portfolioModal.getElementsByTagName("img"),
            newParentHeight = sectionHeight,
            halfClient = clientWidth * 0.5,
            translateX = 0,
            translateY = domNode.getBoundingClientRect().top - 45,
            xPosition = domNode.getBoundingClientRect().left,
            yPosition = domNode.getBoundingClientRect().top - 45,
            imgTranslateX = 0,
            imgTranslateY = 0;

        if (clientWidth < 768) {
            //domNode.style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newParentHeight + "px; z-index: 100; overflow-y: scroll; -webkit-transform: translate(" + translateX + "px, -" + translateY + "px); -moz-transform: translate(" + translateX + "px, -" + translateY + "px); -ms-transform: translate(" + translateX + "px, -" + translateY + "px); -o-transform: translate(" + translateX + "px, -" + translateY + "px); transform: translate(" + translateX + "px, -" + translateY + "px);";

            img[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); top: 0; -webkit-transform: translate(0px, 0px); -moz-transform: translate(0px, 0px); -ms-transform: translate(0px, 0px); -o-transform: translatetranslate(0px, 0px); transform: translate(0px, 0px);";

            imgWrap[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + img[0].offsetHeight + "px";
        }

        if (clientWidth >= 768) {
            if (xPosition === halfClient) {
                translateX = -xPosition;
            }
            translateY -= 15;

            img[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); width: 75%; margin: 0 12.5%; top: 0; -webkit-transform: translate(0px, 0px); -moz-transform: translate(0px, 0px); -ms-transform: translate(0px, 0px); -o-transform: translatetranslate(0px, 0px); transform: translate(0px, 0px);";

            setTimeout(function () {
                imgWrap[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + img[0].offsetHeight + "px";
            }, 800);
        }

        if (clientWidth >= 1024) {
            img[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); width: 50%; margin: 0 25%; top: 0; -webkit-transform: translate(0px, 0px); -moz-transform: translate(0px, 0px); -ms-transform: translate(0px, 0px); -o-transform: translatetranslate(0px, 0px); transform: translate(0px, 0px);";
            
            setTimeout(function () {
                imgWrap[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + img[0].offsetHeight + "px";
            }, 800);
        }
        
        portfolioModal.style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newParentHeight + "px; width: " + clientWidth + "px; overflow-y: scroll; -webkit-transform: translate(" + translateX + "px, -" + translateY + "px); -moz-transform: translate(" + translateX + "px, -" + translateY + "px); -ms-transform: translate(" + translateX + "px, -" + translateY + "px); -o-transform: translate(" + translateX + "px, -" + translateY + "px); transform: translate(" + translateX + "px, -" + translateY + "px);";
    },
    "hideBlock": function (domNode) {
        var halfClient = clientWidth / 2,
            newParentHeight = sectionHeight * 0.4,
            newParentWidth = clientWidth,
            imgWrap = portfolioModal.getElementsByClassName("imgWrap"),
            img = portfolioModal.getElementsByTagName("img");

        if (clientWidth < 768) {
            imgWrap[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newParentHeight + "px";

            img[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); top: 50%; transform: translateY(-50%);"
        }

        if (clientWidth >= 768) {
            if (domNode !== portfolioDivs[0]) {
                newParentWidth = halfClient;
            }
            
            imgWrap[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newParentHeight + "px";

            img[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); width: 100%; margin: 0; top: 50%; transform: translateY(-50%);"
        }

        portfolioModal.style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newParentHeight + "px; width: " + newParentWidth + "px; -webkit-transform: translate(0px, 0px); -moz-transform: translate(0px, 0px); -ms-transform: translate(0px, 0px); -o-transform: translate(0px, 0px); transform: translate(0px, 0px);";

        portfolioModal.style.zIndex = "0";
    },
    /**** Method to check which <div>/<section> is currently showing */
    "checkActive": function (type, id) {
        var info = [],
            className = "",
            domNode,
            active = false,
            obj = {
                bool: false,
                active: Object
            };

        function check() {
            if (id !== undefined) {
                //Runs when section or nav is being checked
                if (id === info[i]) {
                    //Currently clicked page is active
                    obj.bool = true;
                    return;
                } else {
                    //Only remove activePage class when another page is clicked 
                    method.removeClass(domNode, className);
                    return;
                }
            } else {
                //Runs when a page block is being checked
                return;
            }
        }

        if (type === "page") {
            info = ["aboutPage", "portfolioPage", "resumePage", "contactPage"];
            className = "activePage";
            for (var i = 0; i < info.length; i++) {
                domNode = document.getElementById(info[i])
                active = method.hasClass(domNode, className);

                if (active !== false) {
                    obj.active = document.getElementById(info[i])
                    break;
                }
            }
            check();
        } else {
            className = "activeBlock";
            for (var i = 0; i < portfolioDivs.length; i++) {
                var ifPortPiece = method.hasClass(portfolioDivs[i], "portfolioBlock");

                if (ifPortPiece) {
                    active = method.hasClass(portfolioDivs[i], className);

                    if (active !== false) {
                        obj.active = portfolioDivs[i]
                        break;
                    }
                }
            }
            check();
        }

        return obj
    },
    /**** Method to open or close page clicked or currently active */
    "openCloseSection": function (id) {
        var domNode = document.getElementById(id);
        var check = method.checkActive("page", id);

        if (check.bool === true) {
            //Runs if aHref tag click is link for currently active page
            method.hideSection(nav);
        } else {
            //Runs if currently active page is not aHref tag clicked
            var currentActive = check.active,
                currentId = currentActive.getAttribute("id");
            
            if (currentId === "portfolioPage") {
                portfolioModal.style.top = -clientHeight + "px";
            }
            
            method.hideSection(currentActive, function () {
                console.log(currentId)
                method.showSection(domNode, function () {
                    method.hideSection(nav);
                    method.addClass(domNode, "activePage");
                });
            })
        }
    },
    "openBlock": function (parent, blockType, img) {
        var domNode = parent.parentElement,
            childPos = domNode.getBoundingClientRect(),
            parentPos = domNode.parentNode.getBoundingClientRect(),
            childOffset = {
                top: childPos.top - parentPos.top,
                left: childPos.left - parentPos.left
            };

        if (clientWidth < 768) {
            //If client is on phone set childOffset to be 45px extra from where it is to account for navigation
            childOffset.top += 45;
        }

        if (clientWidth >= 768) {
            //If client is on tablet set childOffset to be 60px extra from where it is to account for navigation
            childOffset.top += 60;
        }

        if (blockType === "portfolio") {
            var portfolio = document.getElementById("portfolioPage");

            //Set innerHTML of  to selected domNode  
            portfolioModal.innerHTML = domNode.innerHTML;

            //Set modal position based on domNode clicked & bring to top
            if (domNode === portfolioDivs[0]) {
                portfolioModal.style.cssText = "width: " + clientWidth + "px; top: " + childOffset.top + "px; left: " + childOffset.left + "px; z-index: 99";
            } else {
                portfolioModal.style.cssText = "top: " + childOffset.top + "px; left: " + childOffset.left + "px; z-index: 99";
            }

            portfolio.style.overflowY = "hidden";
            method.svg("backBtn", true);
            method.addClass(navBtn, "blockOpen");
            method.showBlock(domNode);
        }

        //method.showBlock(domNode);
        method.addClass(domNode, "activeBlock");
    },
    "closeBlock": function (activeDomNode) {
        var portfolio = document.getElementById("portfolioPage"),
            imgWrap = activeDomNode.getElementsByClassName("imgWrap"),
            img = activeDomNode.getElementsByTagName("img");

        var newHeight = 0,
            newZindex = 98;

        //Set page block newHeight & newZindex
        //        for (var i = 0; i < portfolioDivs.length; i++) {
        //            if (activeBlock === portfolioDivs[i]) {
        //                if (i !== 0) {
        //                    newHeight = blockHeight;
        //
        //                    //98 is first block's zIndex, subtract by i divided by 2 since portfolioDivs[] has both .portfolioBlock <div> & .imgWrap <div> as part of selections 
        //                    newZindex = 98 - (i / 2);
        //                } else {
        //                    newHeight = bannerHeight;
        //                }
        //
        //                break;
        //            }
        //        }

        //activeBlock.style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newHeight + "px; z-index: " + newZindex + "; overflow-y: hidden; -webkit-transform: translateY(0px); -moz-transform: translateY(0px); -ms-transform: translateY(0px); -o-transform: translateY(0px); transform: translateY(0px);";

        //imgWrap[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); height: " + newHeight + "px"; 

        //img[0].style.cssText += "-webkit-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -moz-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -ms-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); -o-transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); transition: all 1s cubic-bezier(0.4, 0.01, 0.165, 0.99); top: 50%; transform: translateY(-50%);"

        portfolio.style.overflowY = "scroll";

        method.hideBlock(activeDomNode);
        method.removeClass(activeDomNode, "activeBlock");
    }
}

//Run when all HTML/DOM has loaded
document.addEventListener("DOMContentLoaded", function (event) {

    navBtn.addEventListener("click", function () {
        var menuOpen = method.hasClass(navBtn, "menuShowing");
        var blockOpen = method.hasClass(navBtn, "blockOpen");

        if (!blockOpen) {
            //If blocks are not open
            if (!menuOpen) {
                //If menu is not open
                method.addClass(navBtn, "menuShowing");
                method.svg("closeBtn", true);
                method.showSection(nav);
            } else {
                //If menu is open
                method.removeClass(navBtn, "menuShowing")
                method.svg("closeBtn");
                method.hideSection(nav);
            }
        } else {
            //If any block is open
            var check = method.checkActive("block"),
                activeBlock = check.active;

            method.removeClass(navBtn, "blockOpen");
            method.closeBlock(activeBlock);
            method.svg("backBtn");
        }
    });

    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener("click", function (event) {
            var id = event.target.id;
            var page = textContent[("#" + id)];
            method.openCloseSection(page);
            method.removeClass(navBtn, "menuShowing");
            method.svg("closeBtn");
        });
    }

    for (var i = 0; i < portfolioDivs.length; i++) {
        portfolioDivs[i].addEventListener("click", function (event) {
            var parent = event.target.parentElement;
            method.openBlock(parent, "portfolio", "true");
        })
    }

    for (var i = 0; i < resumeBlocks.length; i++) {
        resumeBlocks[i].addEventListener("click", function (event) {
            var parent = event.target.parentElement;
            method.openBlock(parent)
        })
    }

    method.init()

    window.addEventListener("resize", function () {
        method.init()
        console.log('boo')
    });
});