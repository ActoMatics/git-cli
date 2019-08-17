import { injectable, inject } from 'inversify';
import { Logger } from './utils/logger.util';
import { FeatureRequest } from './templates/github/feature-request.template';
import { UniversalChoiceValue, GithubChoiceValue, GitlabChoiceValue, Answer, ProviderValue } from './models/answer-choice';
import { MergeRequest } from './templates/gitlab/merge-request.template';
import { providerQuestion, githubFileQuestion, gitlabFileQuestion } from './questions';
import { ConsoleMessage } from './models/console-message';

@injectable()
export class CGX {

    constructor(@inject('Logger') private logger: Logger,
                @inject('FeatureRequest') private featureRequest: FeatureRequest,
                @inject('MergeRequest') private mergeRequest: MergeRequest)
                {
        this.logger.showTitleAndBanner();
        this.executeCGX();
    }

    public async executeCGX(): Promise<any> {
        let providerAnswer: Answer = await providerQuestion();

        if (providerAnswer.provider === ProviderValue.GITHUB) {
            return this.githubActions();
        } else if (providerAnswer.provider === ProviderValue.GITLAB)  {
            return this.gitlabActions();
        } 
    }

    private async githubActions() {
        let githubFileAnswer: Answer = await githubFileQuestion();

        switch (githubFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);

                this.featureRequest.generateFile();
            }
          
            case GithubChoiceValue.FEATURE_REQUEST: {
                return this.featureRequest.generateFile();
            }

        }
    }

    private async gitlabActions() {
        let gitlabFileAnswer: Answer = await gitlabFileQuestion();
        
        switch (gitlabFileAnswer.files) {
            case UniversalChoiceValue.ALL: {
                this.logger.showInfo(ConsoleMessage.START_GENERATING);
                
                return this.mergeRequest.generateFile();
            }

            case GitlabChoiceValue.MERGE_REQUEST: {
                return this.mergeRequest.generateFile();
            }
        }
    }

}