describe("Google Search Spec", () => {
  const searchBoxSelector = "textarea[aria-label]";
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

  interface TestSearchParams {
    query: string;
    expectedHref: string;
    exact?: boolean;
  }

  function testSearch({
    query,
    expectedHref,
    exact = false,
  }: TestSearchParams) {
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
      cy.get("@searchBox")
        .type(`${query} {enter}`)
        .then(() => {
          cy.get("#search")
            .should("be.visible")
            .within(() => {
              cy.get("div.g").should("have.length.at.least", numberOfResults);
            });
        });
    });
  }

  const tests: TestSearchParams[] = [
    { query: "discord", expectedHref: urls.discordExact, exact: true },
    { query: "youtube", expectedHref: urls.youtubeExactEN, exact: true },
    { query: "discord", expectedHref: urls.discordPartial },
    { query: "youtube", expectedHref: urls.youtubePartial },
  ];

  tests.forEach((test) => testSearch(test));
  testSearchExpectXResults("discord", 5);
  testSearchExpectXResults("youtube", 5);
});
