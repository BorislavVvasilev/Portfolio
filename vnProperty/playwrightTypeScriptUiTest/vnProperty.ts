import { Locator, Page } from '@playwright/test';
import { LINK_OFFICIAL_REPORTS_NAME , LINK_PROPERTY_REPORT_NAME } from "../../constants/propertyLinkConstants.ts";

// Клас за страницата за търсене на имот
export class PropertyPage {
    private readonly page: Page;

    // Декларация на всички елементи на страницата
    public readonly searchBtn: Locator;
    public readonly newSearchBtn: Locator;
    public readonly backBtn: Locator;
    public readonly propertyNumberField: Locator;
    public readonly inactivePropertiesCheckbox: Locator;
    public readonly ownerSearchCheckbox: Locator;
    public readonly ownerIdField: Locator;
    public readonly table: Table;
    public readonly fastSearchCheckbox: Locator;
    public readonly detailsSearchCheckbox: Locator;

    public readonly oldPropertyNumberField: Locator;
    public readonly propertyTypeField: Locator;
    public readonly territoryPurposeField: Locator;
    public readonly usageTypeField: Locator;
    public readonly buildingPurposeField: Locator;
    public readonly documentAreaField: Locator;
    public readonly predominantSoilCategoryField: Locator;
    public readonly cadastralNumberField: Locator;
    public readonly localityField: Locator;
    public readonly massifField: Locator;
    public readonly regionField: Locator;
    public readonly municipalityField: Locator;
    public readonly settlementField: Locator;
    public readonly adjacentObjectField: Locator;
    public readonly residentialComplexField: Locator;
    public readonly neighborhoodField: Locator;
    public readonly streetField: Locator;
    public readonly numberField: Locator;
    public readonly floorField: Locator;
    public readonly noteField: Locator;
    public readonly identifierField: Locator;
    public readonly realAreaField: Locator;
    public readonly regulatedNeighborhoodField: Locator;
    public readonly regulatoryPlanField: Locator;
    public readonly parcelField: Locator;
    public readonly objectNumberField: Locator;
    public readonly blockField: Locator;
    public readonly apartmentField: Locator;
    public readonly entranceField: Locator;
    public readonly postalCodeField: Locator;
    public readonly pageTitle: Locator;
    public readonly propertySearch: Locator;

    // Конструктор за инициализиране на елементите на страницата
    constructor(page: Page) {
        this.page = page;
        this.propertySearch = page.getByRole('button', { name: 'Търсене на имот' });
        this.pageTitle = page.getByText('Търсене/добавяне на имот', { exact: true });
        this.searchBtn = page.getByRole('button', { name: 'Търси' });
        this.newSearchBtn = page.getByRole('button', { name: 'Ново търсене' });
        this.backBtn = page.getByRole('button', { name: 'Назад' });

        this.inactivePropertiesCheckbox = page.getByLabel('търси и неактивните имоти');
        this.ownerSearchCheckbox = page.locator('input.form-check-input#stOwner'); //Радио бутон за Търсене по собственик
        this.ownerIdField = page.getByLabel('ЕГН/ЛНЧ/ЕИК/БУЛСТАТ');

        this.fastSearchCheckbox = page.getByLabel('Бързо търсене по данни на имот');
        this.detailsSearchCheckbox = page.locator('input[type="radio"][id="stExtended"]'); //Радио бутон за Търсене по данни на имот
        this.table = new Table(page);
        this.propertyNumberField = page.getByLabel('Партида №').first();
        this.oldPropertyNumberField = page.getByLabel('Стара имотна партида').first();
        this.propertyTypeField = page.getByText('Вид имот').first();
        this.territoryPurposeField = page.getByText('Трайно предназначение на територия').first();
        this.usageTypeField = page.getByText('Начин на трайно ползване').first();
        this.buildingPurposeField = page.getByText('Предназначение(сгради и самостоятелни обекти)').first();
        this.documentAreaField = page.getByText('Площ (по документ)').first();
        this.predominantSoilCategoryField = page.getByText('Преобладаваща категория почва').first();
        this.cadastralNumberField = page.getByText('Планоснимачен №').first();
        this.localityField = page.getByText('Местност').first();
        this.massifField = page.getByText('Масив').first();
        this.regionField = page.getByText('Област').first();
        this.municipalityField = page.getByText('Община').first();
        this.settlementField = page.getByText('Населено място').first();
        this.adjacentObjectField = page.getByText('Прилежащ обект').first();
        this.residentialComplexField = page.getByText('Жилищен комплекс').first();
        this.neighborhoodField = page.getByText('Квартал').nth(1);
        this.streetField = page.getByText('Улица').first();
        this.numberField = page.getByText('№', { exact: true }).first();
        this.floorField = page.getByText('Етаж').first();
        this.noteField = page.getByLabel('Забележка').first();
        this.identifierField = page.getByText('Идентификатор', { exact: true }).first();
        this.realAreaField = page.getByText('Площ (реална)').first();
        this.regulatedNeighborhoodField = page.getByText('Квартал, попадащ в регулация').first();
        this.regulatoryPlanField = page.getByText('По регулационен план').first();
        this.parcelField = page.getByText('Парцел').first();
        this.objectNumberField = page.getByText('Номер на обект').first();
        this.blockField = page.locator('div').filter({ hasText: /^Блок$/ }).first();
        this.apartmentField = page.getByText('Апартамент').first();
        this.entranceField = page.getByText('Вход').first();
        this.postalCodeField = page.getByText('П.К').first();

    }

    // Метод за попълване на полетата на страницата
    async fillFields(fields: Fields) {
        await this.page.waitForLoadState('networkidle');

        if (fields.propertyNumber) {
            await this.propertyNumberField.click();
            await this.propertyNumberField.fill(fields.propertyNumber);
        }

        if (fields.oldPropertyNumber) {
            await this.oldPropertyNumberField.click();
            await this.oldPropertyNumberField.fill(fields.oldPropertyNumber);
        }

        if (fields.propertyType) {
            await this.propertyTypeField.click();
            await this.propertyTypeField.fill(fields.propertyType);
        }

        if (fields.territoryPurpose) {
            await this.territoryPurposeField.click();
            await this.territoryPurposeField.fill(fields.territoryPurpose);
        }

        if (fields.usageType) {
            await this.usageTypeField.click();
            await this.usageTypeField.fill(fields.usageType);
        }

        if (fields.buildingPurpose) {
            await this.buildingPurposeField.click();
            await this.buildingPurposeField.fill(fields.buildingPurpose);
        }

        if (fields.documentArea) {
            await this.documentAreaField.click();
            await this.documentAreaField.fill(fields.documentArea);
        }

        if (fields.predominantSoilCategory) {
            await this.predominantSoilCategoryField.click();
            await this.predominantSoilCategoryField.fill(fields.predominantSoilCategory);
        }

        if (fields.cadastralNumber) {
            await this.cadastralNumberField.click();
            await this.cadastralNumberField.fill(fields.cadastralNumber);
        }

        if (fields.locality) {
            await this.localityField.click();
            await this.localityField.fill(fields.locality);
        }

        if (fields.massif) {
            await this.massifField.click();
            await this.massifField.fill(fields.massif);
        }

        if (fields.region) {
            await this.regionField.click();
            await this.regionField.fill(fields.region);
        }

        if (fields.municipality) {
            await this.municipalityField.click();
            await this.municipalityField.fill(fields.municipality);
        }

        if (fields.settlement) {
            await this.settlementField.click();
            await this.settlementField.fill(fields.settlement);
        }

        if (fields.adjacentObject) {
            await this.adjacentObjectField.click();
            await this.adjacentObjectField.fill(fields.adjacentObject);
        }

        if (fields.residentialComplex) {
            await this.residentialComplexField.click();
            await this.residentialComplexField.fill(fields.residentialComplex);
        }

        if (fields.neighborhood) {
            await this.neighborhoodField.click();
            await this.neighborhoodField.fill(fields.neighborhood);
        }

        if (fields.street) {
            await this.streetField.click();
            await this.streetField.fill(fields.street);
        }

        if (fields.number) {
            await this.numberField.click();
            await this.numberField.fill(fields.number);
        }

        if (fields.floor) {
            await this.floorField.click();
            await this.floorField.fill(fields.floor);
        }

        if (fields.note) {
            await this.noteField.click();
            await this.noteField.fill(fields.note);
        }

        if (fields.identifier) {
            await this.identifierField.click();
            await this.identifierField.fill(fields.identifier);
        }

        if (fields.realArea) {
            await this.realAreaField.click();
            await this.realAreaField.fill(fields.realArea);
        }

        if (fields.regulatedNeighborhood) {
            await this.regulatedNeighborhoodField.click();
            await this.regulatedNeighborhoodField.fill(fields.regulatedNeighborhood);
        }

        if (fields.regulatoryPlan) {
            await this.regulatoryPlanField.click();
            await this.regulatoryPlanField.fill(fields.regulatoryPlan);
        }

        if (fields.parcel) {
            await this.parcelField.click();
            await this.parcelField.fill(fields.parcel);
        }

        if (fields.objectNumber) {
            await this.objectNumberField.click();
            await this.objectNumberField.fill(fields.objectNumber);
        }

        if (fields.block) {
            await this.blockField.click();
            await this.blockField.fill(fields.block);
        }

        if (fields.apartment) {
            await this.apartmentField.click();
            await this.apartmentField.fill(fields.apartment);
        }

        if (fields.entrance) {
            await this.entranceField.click();
            await this.entranceField.fill(fields.entrance);
        }

        if (fields.postalCode) {
            await this.postalCodeField.click();
            await this.postalCodeField.fill(fields.postalCode);
        }
        if (fields.ownerId) {
            await this.ownerIdField.click();
            await this.ownerIdField.fill(fields.ownerId);
        }
    }

    /**
   * Метод за навигиране до страницата за търсене на имот
   */
    async navigateTovnPropertyPage() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('link', { name: LINK_OFFICIAL_REPORTS_NAME }).click();
        await this.page.getByRole('link', { name: LINK_PROPERTY_REPORT_NAME }).click();
    }

    /**
   *  Метод за чекване и анчекване на чекбокса за търсене на неактивни имоти
   */
    async toggleInactiveProperties() {
        await this.inactivePropertiesCheckbox.check();
        await this.inactivePropertiesCheckbox.uncheck();
    }

}

// Клас за таблицата на страницата
class Table {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
    * Метод за намиране на ред в таблицата по текст
    */
    findHeaderInTableByText(targetText: string): Locator {
        const header = this.page.locator(`.tabulator-header-contents:has-text("${targetText}")`).first(); // връща първия намерен хедър
        return header;
    }

    /**
    * Метод за намиране на хедър в таблицата по име
    */
    findHeaderByName(targetText: string): Locator {
        const result = this.page.locator(`.tabulator .tabulator-col-title:text-is("${targetText}")`); // намира клетката със стойност.
        return result;
    }

    /**
    * Метод за избор на имот
    */
    async viewEdit() {
        await this.page.getByRole('row').locator('i').nth(2).click();
    }

    /*
    * Метод за преглед/редакция на имот
    */
    async viewOrEditProperty() {
        await this.page.getByRole('row').locator('i').nth(0).click();
    }

    /*
    * Метод за справка за имот
    */
    async generatePropertyReport() {
        await this.page.waitForLoadState('networkidle', { timeout: 5000 });
        await this.page.getByRole('row').locator('i').nth(1).click();
    }
}

// Клас за полетата на страницата
class Fields {
    propertyNumber?: string;
    oldPropertyNumber?: string;
    propertyType?: string;
    territoryPurpose?: string;
    usageType?: string;
    buildingPurpose?: string;
    documentArea?: string;
    predominantSoilCategory?: string;
    cadastralNumber?: string;
    locality?: string;
    massif?: string;
    region?: string;
    municipality?: string;
    settlement?: string;
    adjacentObject?: string;
    residentialComplex?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
    floor?: string;
    note?: string;
    identifier?: string;
    realArea?: string;
    regulatedNeighborhood?: string;
    regulatoryPlan?: string;
    parcel?: string;
    objectNumber?: string;
    block?: string;
    apartment?: string;
    entrance?: string;
    postalCode?: string;
    ownerId?: string;
}
