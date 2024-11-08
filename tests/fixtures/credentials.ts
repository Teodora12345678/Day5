export function getCredentials(env: string) { //PART OF TAKS 3
    const credentials = {
      username: '',
      password: ''
    };
  
    switch (env) {
      case 'dev':
        credentials.username = 'standard_user';
        credentials.password = 'secret_sauce';
        break;
      case 'qa':
        credentials.username = 'locked_out_user';
        credentials.password = 'secret_sauce';
        break;
      case 'prod':
        credentials.username = 'performance_glitch_user';
        credentials.password = 'secret_sauce';
        break;
      default:
        credentials.username = 'standard_user';
        credentials.password = 'secret_sauce';
    }
  
    return credentials;
  }
  