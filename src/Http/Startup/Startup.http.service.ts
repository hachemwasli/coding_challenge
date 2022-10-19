import axios from 'axios';
import { Startup, StartupDTO } from '../../Types/Startup';
import StartupMapper from './Startup.mapper';

export class StartupHttpService {
  public static async getStartupById(id: string | number): Promise<Startup> {
    const response = await axios.get<StartupDTO>(`/api/startups/${id}`);
    return StartupMapper.map(response.data);
  }

  public static async getStartups(): Promise<any> {
    const response = await axios.get<StartupDTO[]>(`/api/startups`);
    console.log('response', response);
    const formatted = response.data.map((format) => {
      return StartupMapper.map(format);
    });
    console.log('formatted', formatted);
    return formatted;
  }
}
