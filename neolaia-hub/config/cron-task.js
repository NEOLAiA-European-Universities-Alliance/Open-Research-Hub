module.exports = {
    deactive_otp : {
        task: async ({ strapi }) => {
            try{
                const currentTimeStamp = new Date().getTime();
                const entries = await strapi.query('api::neolaia-user.neolaia-user').find();
                for(const entry of entries){
                    const otp_generation_time = parseInt(entry.otp_generation_timestamp)
                    const current_time_stamp = new Date().getTime();
                    //3600000 is 1h
                    if(current_time_stamp - otp_generation_time >= 3600000){
                        await strapi.query('api::neolaia-user.neolaia-user').update({id: entry.id}, {otp_active: false, OTP: ''})
                    }
                }
            } catch (error){
                console.log('Error during the deactivation of otp pwd: ',error)
            }
        },
        options: {
            rule: "*/30 * * * *"
        }
    }
}