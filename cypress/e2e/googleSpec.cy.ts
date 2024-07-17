describe("Google Search Spec", () => {
  const searchBoxSelector = 'textarea[aria-label]';
  const urls = {
    discordExact: "https://discord.com/",
    youtubeExactES: "https://m.youtube.com/?hl=es", // Use this variable for local (ES) tests
    youtubeExactEN: "https://www.youtube.com/", // Use this variable for github actions (EN)   
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

  function testSearchExpectXResults(query: string, numberOfResults: number) {
    it(`Verify Google search returns at least ${numberOfResults} Results`, () => {
      cy.get("@searchBox").type(`${query} {enter}`);
      cy.get("#search div")
        .eq(1)
        .children()
        .should("have.length.at.least", numberOfResults);
    });
  }

  testSearch("discord", urls.discordExact, true);
  testSearch("youtube", urls.youtubeExactEN, true);
  testSearch("discord", urls.discordPartial);
  testSearch("youtube", urls.youtubePartial);

  testSearchExpectXResults("discord", 5);
  testSearchExpectXResults("youtube", 5);
});
