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
      dimensions = {}
      %w(PackageDimensions ItemDimensions).each do |dimension|
        %w(Height Width Length).each do |side|
          if item.get("ItemAttributes/#{dimension}/#{side}").present?
            dimensions[side] = '%d %s' % [item.get("ItemAttributes/#{dimension}/#{side}"), item.get_element("ItemAttributes/#{dimension}/#{side}").attributes['Units']]
          end
        end
      end

      {
        asin: item.get('ASIN'),
        title: item.get('ItemAttributes/Title'),
        url: item.get('DetailPageURL'),
        small_image_url: item.get('SmallImage/URL'),
        large_image_url: item.get('LargeImage/URL'),
        number_of_pages: item.get('ItemAttributes/NumberOfPages'),
        dimensions: {
          width: dimensions['Width'],
          height: dimensions['Height'],
          length: dimensions['Length'],
        }
      }
    end

    Rails.logger.debug(response_items)

    render json: response_items
  end
end
