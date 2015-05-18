describe("User interface", function() {
    afterEach(function() {
        fixtures.cleanUp();
    });

    describe("settings menu", function() {
        // TODO: figure out, how to make before() resp. beforeEach() work
        // then put menu creation there
        it("should show the time spent with this pet", function() {
            var menu = new Menu();
            expect(menu.time).to.be.above(0);
        });

        it("should let the user turn of sound", function() {
            var menu = new Menu();
            expect(menu.sound).to.be.ok;
            menu.toggleSound();
            expect(menu.sound).not.to.be.ok;
        });

        xit("should let the user turn of music", function() {
            var menu = new Menu();
            expect(menu.music).to.be.ok;
            menu.toggleSound();
            expect(menu.music).not.to.be.ok;
        });

        it("should load fixtures", function() {
            fixtures.load("menu.html");
            var content = fixtures.bodyAsDom();
            expect(content[0]).to.eq('a');
        });
    });
});
