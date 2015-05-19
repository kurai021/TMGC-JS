describe("Initialisation", function() {
    describe("menu items", function() {
        var iFrameWindow, content;

        describe("top menu", function() {
            before(function() {
                fixtures.load('top-menu.html');
                iFrameWindow = fixtures.window();
                content = iFrameWindow.document.body.children;
            });

            after(function() {
                fixtures.cleanUp();
            });

            it("should have for items", function() {
                expect(content[0].childElementCount).to.eq(4);
            });

            it("should have a dashboard menu item", function() {
                var dashboardMenu = content[0].querySelectorAll('.fa-dashboard');
                expect(dashboardMenu).not.to.be.empty;
                expect(dashboardMenu.length).to.eq(1);
            }); 

            it("should have a feed menu item", function() {
                var feedMenu = content[0].querySelectorAll('.fa-cutlery');
                expect(feedMenu).not.to.be.empty;
                expect(feedMenu.length).to.eq(1);
            }); 

            it("should have a toilet menu item", function() {
                var toiletMenu = content[0].querySelectorAll('.fa-tint');
                expect(toiletMenu).not.to.be.empty;
                expect(toiletMenu.length).to.eq(1);
            }); 

            it("should have a play menu item", function() {
                var playMenu = content[0].querySelectorAll('.fa-gamepad');
                expect(playMenu).not.to.be.empty;
                expect(playMenu.length).to.eq(1);
            }); 
        });


        describe("bottom menu", function() {
            before(function() {
                fixtures.load('bottom-menu.html');
                iFrameWindow = fixtures.window();
                content = iFrameWindow.document.body.children;
            });

            after(function() {
                fixtures.cleanUp();
            });

            it("should have for items", function() {
                expect(content[0].childElementCount).to.eq(4);
            });

            it("should have a talk menu item", function() {
                var talkMenu = content[0].querySelectorAll('.fa-comment');
                expect(talkMenu).not.to.be.empty;
                expect(talkMenu.length).to.eq(1);
            }); 

            it("should have a aid menu item", function() {
                var aidMenu = content[0].querySelectorAll('.fa-medkit');
                expect(aidMenu).not.to.be.empty;
                expect(aidMenu.length).to.eq(1);
            }); 

            it("should have a bed menu item", function() {
                var bedMenu = content[0].querySelectorAll('.fa-moon-o');
                expect(bedMenu).not.to.be.empty;
                expect(bedMenu.length).to.eq(1);
            }); 

            it("should have a settings menu item", function() {
                var settingsMenu = content[0].querySelectorAll('.fa-gear');
                expect(settingsMenu).not.to.be.empty;
                expect(settingsMenu.length).to.eq(1);
            }); 
        });

    });
});
