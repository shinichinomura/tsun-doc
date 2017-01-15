class Api::User::UserAmazonBooksController < ApplicationController
  def index
    @user_amazon_books = current_user
      .user_amazon_books
      .group("DATE_FORMAT(added_on, '%Y-%m-01')")
      .order("DATE_FORMAT(added_on, '%Y-%m-01')")
      .count

    render json: @user_amazon_books
  end
end
