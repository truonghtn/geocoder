export enum ENV_NAME {
    PRODUCTION,
    STAGING,
    DEVELOPMENT
}

class Enviroment {
    env: ENV_NAME = ENV_NAME.DEVELOPMENT;
    port: number = 3254;
    socketIOPort: number = 3255;
    redisHost: string = 'localhost';
    redisPort: number = 6379;
    
    configure() {
        const env = (process.env.NODE_ENV || '').toLowerCase();
        if (env == 'prod' || env == 'production') {
            this.env = ENV_NAME.PRODUCTION;
        }
        else if (env == 'stag' || env == 'staging') {
            this.env = ENV_NAME.STAGING;
        }
        else {
            this.env = ENV_NAME.DEVELOPMENT;
        }
    }
};

export const ENV: Enviroment = new Enviroment();
export default ENV;