import 'survey-core/defaultV2.min.css';
import erc_panel from '../components/form_components/erc_panel.json';
import personal_info from '../components/form_components/personal_info.json';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const erc_panel_interest = JSON.parse(JSON.stringify(erc_panel));
erc_panel_interest.pages[0].elements[0].title = 'Select 3 areas of research in which you are interested'

//To solve question already answered from the research are panel, rename all key 
erc_panel_interest.name = 'erc_panel_research_area_interested'
erc_panel_interest.pages[0].name= 'interested_research_area'
erc_panel_interest.pages[0].elements[0].name = 'ERC_panel_interested'

personal_info.pages.push(erc_panel.pages[0])
personal_info.pages.push(erc_panel_interest.pages[0])

function MappingResearchers(){
    const research_survey = new Model(personal_info)

    return <Survey model={research_survey} />
}

export default MappingResearchers;