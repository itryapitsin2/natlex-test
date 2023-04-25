import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { typeDefs, DateResolver } from 'graphql-scalars';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChartModule } from './chart/chart.module';
import { chartTypeResolver } from './chart/entity/chartType';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartEntity } from './chart/entity/chart.entity';
import { DatabaseConfig } from './database/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Module({
  imports: [
    ChartModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typeDefs,
      resolvers: {
        Date: DateResolver,
        ChartType: chartTypeResolver,
      },
    }),
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [ChartEntity],
    } as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
