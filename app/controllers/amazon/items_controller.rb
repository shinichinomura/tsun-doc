class Amazon::ItemsController < ApplicationController
  def search
    search_params = {
      country: 'jp',
      response_group: 'Medium',
      search_index: params[:search_index],
      sort: 'salesrank'
    }

    search_params[:power] = 'not kindle' if params[:search_index] == 'Books'

    res = Amazon::Ecs.item_search(params[:keyword], search_params)

    response_items = res.items.map do |item|
      {
        asin: item.get('ASIN'),
        title: item.get('ItemAttributes/Title'),
        url: item.get('DetailPageURL'),
        small_image_url: item.get('SmallImage/URL'),
        large_image_url: item.get('LargeImage/URL'),
        number_of_pages: item.get('ItemAttributes/NumberOfPages'),
      }
    end

    Rails.logger.debug(response_items)

    render json: response_items
  end
end
