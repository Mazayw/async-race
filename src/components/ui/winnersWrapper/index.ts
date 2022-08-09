import { CreateElement } from '../../createElement';
import { ICar } from '../../../interfaces';
import { getAllWinners } from '../../api';
import { WinnersTable } from '../winersTable/index';

export class WinnersWrapper extends CreateElement {
  winners: { result: ICar[]; total: string };

  pageNumber = 1;

  sort = 'wins';

  order = 'DESC';

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['winners-page']);
    this.drawPage();
  }

  private async getWinners(): Promise<void> {
    this.winners = await getAllWinners(
      this.pageNumber,
      10,
      this.sort,
      this.order
    );
  }

  private async drawPage() {
    await this.getWinners();

    new WinnersTable(this.element, this.winners);
    console.log(this.winners);
  }
}
