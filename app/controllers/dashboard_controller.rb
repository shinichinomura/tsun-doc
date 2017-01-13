class DashboardController < ApplicationController
  def index
    @user_amazon_books = current_user.user_amazon_books.includes(:amazon_book)
  end
end
