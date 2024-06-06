module.exports = (config, { strapi }) => {
    return async (ctx, next) =>{
        const survey_data = JSON.parse(ctx.request.body.survey_data)
        const user_id = ctx.request.body.data.user_id
        const erc_panel = survey_data.ERC_Panel
        const erc_panel_int = survey_data.ERC_panel_interested
        const department = survey_data[survey_data.university_name]
        const faculty = survey_data[department]
        const area_erc_1 = erc_panel[0]['Research-General-Area']
        const area_erc_2 = (erc_panel[1] && erc_panel[1]['Research-General-Area']) ?? ''
        const area_erc_3 = (erc_panel[2] && erc_panel[2]['Research-General-Area']) ?? ''
        const area_erc_int_1 = (erc_panel_int[0] && erc_panel_int[0]['Research-General-Area']) ?? ''
        const area_erc_int_2 = (erc_panel_int[1] && erc_panel_int[1]['Research-General-Area']) ?? ''
        const area_erc_int_3 = (erc_panel_int[2] && erc_panel_int[2]['Research-General-Area']) ?? ''
        const free_keyword_1 = (survey_data.free_keywords[0] && survey_data.free_keywords[0].free_keyword) ?? ''
        const free_keyword_2 = (survey_data.free_keywords[1] && survey_data.free_keywords[1].free_keyword) ?? ''
        const free_keyword_3 = (survey_data.free_keywords[2] && survey_data.free_keywords[2].free_keyword) ?? ''
        const data = {
            user_id : user_id,
            name: survey_data.name,
            university_name : survey_data.university_name,
            department : department,
            faculty : faculty ?? '',
            ERC_Panel_1 : erc_panel[0][area_erc_1],
            ERC_Keyword_1 : erc_panel[0][erc_panel[0][area_erc_1]],
            ERC_Panel_2 : (erc_panel[1] && erc_panel[1][area_erc_2]) ?? '',
            ERC_Keyword_2 : (erc_panel[1] && erc_panel[1][erc_panel[1][area_erc_2]]) ?? '',
            ERC_Panel_3 : (erc_panel[2] && erc_panel[2][area_erc_3] )?? '',
            ERC_Keyword_3 : (erc_panel[2] && erc_panel[2][erc_panel[0][area_erc_3]]) ?? '',
            ERC_Panel_interested_1 : (erc_panel_int[0] && erc_panel_int[0][area_erc_int_1]) ?? '', 
            ERC_Keyword_interested_1 : (erc_panel_int[0] && erc_panel_int[0][erc_panel_int[0][area_erc_int_1]]) ?? '',
            ERC_Panel_interested_2 : (erc_panel_int[1] && erc_panel_int[1][area_erc_int_2]) ?? '', 
            ERC_Keyword_interested_2 : (erc_panel_int[1] && erc_panel_int[1][erc_panel_int[1][area_erc_int_2]]) ?? '',
            ERC_Panel_interested_3 : (erc_panel_int[2] && erc_panel_int[2][area_erc_int_3]) ?? '', 
            ERC_Keyword_interested_3 : (erc_panel_int[2] && erc_panel_int[2][erc_panel_int[2][area_erc_int_3]]) ?? '',
            orcid_link : survey_data.ORCID_link ?? '',
            research_group_link : survey_data.research_group_link ?? '',
            personal_page_link : survey_data.personal_page_link ?? '',
            free_keyword_1 : free_keyword_1 ?? '',
            free_keyword_2 : free_keyword_2 ?? '',
            free_keyword_3 : free_keyword_3 ?? ''
        }
        ctx.request.body.data = data

        return next()
    }
}
