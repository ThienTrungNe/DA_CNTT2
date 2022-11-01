Danh sách các folder:
	./Code: Chứa code chạy và mô hình vncorenlp
	./pattern: Chứa file pattern.txt


Danh sách file trong folder Code:
	init_vncorenlp.py: Dùng để tải mô hình vncorenlp (chỉ cần chạy một lần, và không cần chạy khi folder vncorenlp đã có mô hình)
	utils.py: Chứa các hàm xử lý tác vụ phát sinh câu hỏi từ pattern
	api_qg.py: API Python giao tiếp với JavaScript
	run.js: File JavaScript nhúng vào trong html
	index.html: Giao diện trang web


Yêu cầu tải package:
	pip install py_vncorenlp
	pip install Flask
	pip install flask-cors


Thực hiện các bước sau để chạy được Project:
	Bước 1: Cài đặt các package yêu cầu
			pip install py_vncorenlp
			pip install Flask
			pip install flask-cors
	Bước 2: Chạy file init_vn_corenlp.py, lưu ý chỉ cần chạy một lần, và không cần chạy khi folder vncorenlp đã có mô hình
			python init_vn_corenlp.py
	Bước 3: Chạy lệnh bên dưới để chạy server vncorenlp
			vncorenlp -Xmx2g <FULL-PATH-to-VnCoreNLP-jar-file> -p 9000 -a "wseg,pos,ner,parse"
		<FULL-PATH-to-VnCoreNLP-jar-file> là đường dẫn tuyệt đối đến file jar trong folder Code/vncorenlp (Ví dụ: /Users/khanhnguyen/Document/QG/Code/vncorenlp/VnCoreNLP-1.1.1.jar)
	Bước 4: Chạy file api_qg.py để khởi tạo server python lắng nghe post từ file run.js. Lưu ý đổi giá trị biến pattern_path thành đường dẫn tuyệt đối đến file pattern.txt
			python api_qg.py
	Bước 5: Chạy file index.html bằng trình duyệt và phát sinh câu hỏi

Lưu ý về input: input có thể là bất cứ đoạn text nào, code đều chạy được (sentence, paragraph hoặc article), không được có từ viết tắt vì chưa có khâu tiền xử lý câu.

vncorenlp -Xmx2g /Users/trung/Desktop/DA_CNTT2/02.SOURCE/CODE/QG_V2_1/Code/vncorenlp/VnCoreNLP-1.1.1.jar -p 9000 -a "wseg,pos,ner,parse"