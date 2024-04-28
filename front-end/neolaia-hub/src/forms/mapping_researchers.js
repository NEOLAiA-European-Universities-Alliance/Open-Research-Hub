import 'survey-core/defaultV2.min.css';
import erc_panel from '../components/form_components/erc_panel.json';
import personal_info from '../components/form_components/personal_info.json';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

personal_info.pages.push(erc_panel.pages[0])

function MappingResearchers(){
    const research_survey = new Model(personal_info)

    //const research_survey = new Model(erc_panel)

    return <Survey model={research_survey} />
}

export default MappingResearchers;