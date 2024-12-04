import React from 'react';

const PrivacyMessageResearchersMapping = () => {
    return (
        <>
        <p style={{textAlign:"left", marginLeft: "25px", marginRight: "20px"}}>
            Dear Professor/Researcher, <br />
            Thank you for your interest in participating in our NEOLAiA Research Hub. This will help you to find colleagues with similar research areas and interests to start collaborative projects and increase research synergies.
            Please read this short guide before you start so that you can prepare the information needed and speed up.
            Once you have all the necessary information, filling up the form will take between 3 and 5 minutes to complete. This is what we will ask you:
            <ul>
            <li>Your first and last name </li>
            <li>Your university and affiliation </li>
            <li>The URL of your homepage  </li>
                <ul>
                    <li>please make sure that your email address is available there, as this is the way in which you can be contacted </li>
                </ul>
            <li>3 ERC sectors you work in (refer to this list <a href='https://erc.europa.eu/sites/default/files/2023-03/ERC_panel_structure_2024_calls.pdf'>ERC_panel_structure_2024_calls.pdf (europa.eu))</a></li>
            <li>3 ERC sectors you are also interested in</li>
            <ul>
                <li>refer to the same ERC list as above</li>
            </ul>
            <li>Your ORCID profile </li>
            <li>A set of 10 free keywords related to your research (you can choose from existing words or create new ones: as you type, existing keywords will be presented to you)</li>
            </ul>
            
            Please note that the data you provide will be used as Open Data, with the license CC-BY-SA (ATTRIBUTION-SHAREALIKE 4.0 INTERNATIONAL) and, by ticking the boxes below, you are authorising us to use and show it on NEOLAiA Research Hub.
            You will be asked accept the boxes below and to write your email (in one of the NEOLAiA partner universities) and you will be sent a One Time Password (OTP) that will last for an hour.
            </p>
        </>
    );
}

export default PrivacyMessageResearchersMapping;
