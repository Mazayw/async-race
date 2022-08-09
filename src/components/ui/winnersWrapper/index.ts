import { CreateElement } from '../../createElement';
import { ICar } from '../../../interfaces';
import { getAllWinners } from '../../api';
import { WinnersTable } from '../winersTable/index';
import './index.scss';

export class WinnersWrapper extends CreateElement {
  winners: { result: ICar[]; total: string };

  pageNumber = 1;

  sort = 'wins';

  order = 'DESC';

  buttonPrevPage: CreateElement;

  buttonNextPage: CreateElement;

  title: CreateElement;

  page: CreateElement;

  winnersTable: WinnersTable;

  constructor(parent: HTMLElement) {
    super(parent, 'div', ['winners-page']);
    this.title = new CreateElement(this.element, 'h2', ['title']);
    this.page = new CreateElement(this.element, 'h2', ['title']);

    console.log(this.winners);
    const pagination = new CreateElement(this.element, 'div', ['pagination']);
    const sorting = new CreateElement(this.element, 'div', ['sort']);

    const buttonSortNameA = new CreateElement(
      sorting.element,
      'button',
      ['button', 'button-sort'],
      'Sort by Name Asc'
    );
    buttonSortNameA.element.onclick = () => {
      this.sort = 'name';
      this.order = 'ASC';
      this.drawPage();
    };

    const buttonSortNameD = new CreateElement(
      sorting.element,
      'button',
      ['button', 'button-sort'],
      'Sort by Name Desc'
    );

    buttonSortNameD.element.onclick = () => {
      this.sort = 'name';
      this.order = 'DESC';
      this.drawPage();
    };

    const buttonSortWinsA = new CreateElement(
      sorting.element,
      'button',
      ['button', 'button-sort'],
      'Sort by Wins Asc'
    );
    buttonSortWinsA.element.onclick = () => {
      this.sort = 'wins';
      this.order = 'ASC';
      this.drawPage();
    };

    const buttonSortWinsD = new CreateElement(
      sorting.element,
      'button',
      ['button', 'button-sort'],
      'Sort by Wins Desc'
    );
    buttonSortWinsD.element.onclick = () => {
      this.sort = 'wins';
      this.order = 'DESC';
      this.drawPage();
    };

    this.buttonPrevPage = new CreateElement(
      pagination.element,
      'button',
      ['button', 'button-generate'],
      'Prev. Page',
      true
    );
    this.buttonPrevPage.element.setAttribute('type', 'button');

    this.buttonNextPage = new CreateElement(
      pagination.element,
      'button',
      ['button', 'button-generate'],
      'Next. Page'
    );
    this.buttonNextPage.element.setAttribute('type', 'button');

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
    if (this.winnersTable) this.winnersTable.remove();

    this.winnersTable = new WinnersTable(this.element, this.winners);
    this.updateTitle();
    this.updatePage();
  }

  private async updateTitle(): Promise<void> {
    this.title.element.innerHTML = `Winners - (${this.winners.total} cars)`;
  }

  private async updatePage(): Promise<void> {
    this.page.element.innerHTML = `Page - ${this.pageNumber}`;
    const totalPages = Math.ceil(Number(this.winners.total) / 10);
    console.log(totalPages);

    if (this.pageNumber === 1) this.buttonPrevPage.setDisabled(true);
    if (this.pageNumber > 1) this.buttonPrevPage.setDisabled(false);

    if (this.pageNumber === totalPages) this.buttonNextPage.setDisabled(true);
    if (this.pageNumber < totalPages) this.buttonNextPage.setDisabled(false);
  }
}
