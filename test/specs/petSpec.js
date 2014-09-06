describe("User interface", function() {
    describe("settings menu", function() {
        console.log('foo');
        it("should show the time spent with this pet", function() {
            expect(menu).to.have.property(time);
            expect(menu.time).to.be.above(0);
        });

        it("should let the user turn of sound", function() {
            expect(menu).to.have.property(sound);
            expect(sound).to.be.ok;
            menu.toggleSound();
            expect(sound).not.to.be.ok;
        });

        it("should let the user turn of music", function() {
            expect(menu).to.have.property(sound);
            expect(music).to.be.ok;
            menu.toggleSound();
            expect(music).not.to.be.ok;
        });
    });
});
