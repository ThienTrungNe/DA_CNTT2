import py_vncorenlp
from utils import *
import json
vncorenlp_path = '/Users/khanhnguyen/Document/QG/Code/vncorenlp'
pattern_path = '/Users/khanhnguyen/Document/QG/pattern/pattern.txt'
# input_path = '../../io/input.txt'

# model = py_vncorenlp.VnCoreNLP(save_dir=vncorenlp_path)

with open(pattern_path, "r") as f:
    patterns = f.read().split('\n')

text = "Duy Khanh là sinh viên."

# with open(input_path, "r") as f:
#     text = f.read()

# annotated_text = model.annotate_text(text)

from vncorenlp import VnCoreNLP
annotator = VnCoreNLP(address="http://127.0.0.1", port=9000)


# To perform word segmentation, POS tagging, NER and then dependency parsing
annotated_text = annotator.annotate(text)
annotated_text = annotated_text['sentences']
tmp = {}
for i, at in enumerate(annotated_text):
    tmp[i] = at
annotated_text = tmp
print(annotated_text)
print(question_generation(annotated_text, patterns))