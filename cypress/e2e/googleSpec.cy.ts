describe("Google Search Spec", () => {
  const searchBoxSelector = 'textarea[aria-label]';
  const urls = {
    discordExact: "https://discord.com/",
    youtubeExact: "https://m.youtube.com/?hl=es",
    discordPartial: "discord.com",
    youtubePartial: "youtube.com",
  };

  beforeEach(() => {
    cy.visit("https://www.google.com");
    cy.get(searchBoxSelector).as("searchBox");
  });

  function testSearch(
    query: string,
    expectedHref: string,
    exact: boolean = false
  ) {
    it(`testing ${query} search${exact ? " with exact URL" : ""}`, () => {
      cy.get("@searchBox")
        .type(`${query} {enter}`)
        .then(() => {
          cy.url().should("include", "/search?");
          const searchResult = cy.get("#search").find("a");
          if (exact) {
            searchResult.should("have.attr", "href", expectedHref);
          } else {
            searchResult
              .should("have.attr", "href")
              .and("include", expectedHref);
          }
        });
    });
  }

  testSearch("discord", urls.discordExact, true);
  testSearch("youtube", urls.youtubeExact, true);
  testSearch("discord", urls.discordPartial);
  testSearch("youtube", urls.youtubePartial);
});
