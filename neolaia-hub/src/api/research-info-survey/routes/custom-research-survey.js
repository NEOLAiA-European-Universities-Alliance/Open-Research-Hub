
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/research-info-surveys/find-by-user/",
            handler: "research-info-survey.findByUser"
        },
        {
            method: "GET",
            path: "/research-info-surveys/search_keywords/",
            handler: "research-info-survey.search_keywords"   
        },
        {
            method: "GET",
            path : "/research-info-surveys/count_submission/",
            handler: "research-info-survey.count_submission"
        },
        {
            method: "GET",
            path : "/research-info-surveys/count_submission_by_uni/",
            handler: "research-info-survey.count_submission_by_uni"
        }
    ]
}