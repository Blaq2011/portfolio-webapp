import charts from "./views/Charts.js";
import stats from "./views/Stats.js";



// var statsPath = `#statsDiv${StatsDivNumberActive}`;

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/" , view: charts  },
        // { path: "/", view: stats },
    
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });
    
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }
    console.log(match);
    
    const view = new match.route.view(getParams(match));
        document.querySelector(`#chartDiv${ChartDivNumberActive}`).innerHTML = await view.getHtml();
         await view.executeViewScript(`${ChartDivNumberActive}`); // !!! The fix - THIS is the script that executes exactly after the inserted HTML-
};



document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    console.log("DOMContentLoaded event");
    router();
});
window.addEventListener("popstate", router);