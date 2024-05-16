import { Request, Response } from 'express';
import {OpenAI} from "@langchain/openai"


class LangChainController{

    private openAi: Promise<string>;

    constructor() {

    }

    async handleQuery(req: Request, res: Response):Promise<Response> {
        try {
            const { text } = req.query;
            if (!text || typeof text !== 'string') {
                return res.status(400).json({ error: 'Texto de la consulta requerido' });
            }

            let response: Promise<string> = this.openAi = new OpenAI({
                openAIApiKey: "sk-proj-kLDadEqxw77UGbYZSDf6T3BlbkFJOLDU6NuMkk0H2Pm3ji8V",
                temperature: 0.9,
            }).invoke(text);

            res.json(response);
        } catch (error) {
            console.error('Error al realizar la consulta:', error.message);
            res.status(500).json({ error: 'Error al procesar la solicitud' });
        }
    }

}

export default LangChainController;