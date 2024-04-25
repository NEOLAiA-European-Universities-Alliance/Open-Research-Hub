import 'survey-core/defaultV2.min.css';
import erc_panel from '../components/form_components/erc_panel.json';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

function MappingResearchers(){
    const research_survey = new Model(erc_panel)

    return <Survey model={research_survey} />
}

export default MappingResearchers;