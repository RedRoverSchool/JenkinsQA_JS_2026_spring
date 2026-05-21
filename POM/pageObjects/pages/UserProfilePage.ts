import { BasePage } from "./@components";

export class UserProfilePage extends BasePage{
    jenkinsUserId = () => this.page.getByText(/Jenkins User ID/);

}