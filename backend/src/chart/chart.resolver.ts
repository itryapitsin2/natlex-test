import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChartService } from './chart.service';
import { DateRangeFilter } from './dto/dateRangeFilter.input';
import { EditChartInput } from './dto/editChart.input';
import { PageContent } from './dto/pageContent';

@Resolver(() => PageContent)
export class ChartResolver {
  constructor(private readonly viewModeService: ChartService) {}

  @Query(() => PageContent)
  async pageContent(
    @Args('filter') filter: DateRangeFilter,
  ): Promise<PageContent> {
    const pageContent = new PageContent();

    pageContent.charts = await this.viewModeService.getChartCards();
    pageContent.data = this.viewModeService.findWeatherInPeriod(
      filter.from,
      filter.to,
    );

    return pageContent;
  }

  @Mutation(() => PageContent)
  async addChartCard(
    @Args('chart') chart: EditChartInput,
  ): Promise<PageContent> {
    const pageContent = new PageContent();

    pageContent.charts = await this.viewModeService.addChartCard({
      ...chart,
      id: undefined,
    });
    pageContent.data = this.viewModeService.getWeatherData();

    return pageContent;
  }

  @Mutation(() => PageContent)
  async editChart(@Args('chart') chart: EditChartInput): Promise<PageContent> {
    const pageContent = new PageContent();
    pageContent.charts = await this.viewModeService.editChartCard({
      ...chart,
      id: chart.id,
    });
    pageContent.data = this.viewModeService.getWeatherData();

    return pageContent;
  }

  @Mutation(() => PageContent)
  async deleteChart(
    @Args('id', { type: () => Int! }) id: number,
  ): Promise<PageContent> {
    const pageContent = new PageContent();

    pageContent.charts = await this.viewModeService.removeChartCard(id);
    pageContent.data = this.viewModeService.getWeatherData();

    return pageContent;
  }
}
